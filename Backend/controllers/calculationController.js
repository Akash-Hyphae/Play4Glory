const Tournament = require("../models/Tournament");
const PointsTable = require("../models/PointsTable");
const MVP = require("../models/MVP");
const User = require("../models/user");
const WalletTransaction = require("../models/walletTransaction");
const TDMMatch = require("../models/TDMMatch");

// Calculate prize pool and preview winners
const getTournamentCalculations = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament Not Found" });
    }

    const totalCollection = tournament.entryFee * tournament.filledSlots;
    const hostAmount = (totalCollection * (tournament.hostFeePercent || 10)) / 100;
    const platformAmount = (totalCollection * (tournament.platformFeePercent || 10)) / 100;
    const prizePool = Math.max(0, totalCollection - hostAmount - platformAmount);

    let firstPrize, secondPrize, thirdPrize, fourthPrize, mvpPrize;
    let winners = { first: null, second: null, third: null, fourth: null, mvp: null };

    if (tournament.eventType === "tdm") {
      firstPrize = Math.floor(prizePool * 0.4);
      secondPrize = Math.floor(prizePool * 0.3);
      thirdPrize = Math.floor(prizePool * 0.2);
      fourthPrize = Math.floor(prizePool * 0.1);
      mvpPrize = 0;

      // Find final match dynamically (the match that does not have a nextMatch)
      const finalMatch = await TDMMatch.findOne({
        tournament: tournamentId,
        nextMatch: null,
      })
        .populate("winner")
        .populate("teamA")
        .populate("teamB");

      if (finalMatch && finalMatch.winner) {
        winners.first = finalMatch.winner;
        winners.second =
          finalMatch.teamA?._id?.toString() === finalMatch.winner._id.toString()
            ? finalMatch.teamB
            : finalMatch.teamA;
      }
    } else {
      firstPrize = Math.floor(prizePool * 0.6);
      secondPrize = Math.floor(prizePool * 0.25);
      thirdPrize = Math.floor(prizePool * 0.1);
      fourthPrize = 0;
      mvpPrize = Math.floor(prizePool * 0.05);

      const finalStandings = await PointsTable.find({
        tournament: tournamentId,
        group: "FINAL",
      })
        .populate({
          path: "team",
          populate: { path: "registeredBy", select: "displayName email inGameName inGameId walletBalance" },
        })
        .sort({ totalPoints: -1, chickenDinners: -1 });

      const standings =
        finalStandings.length > 0
          ? finalStandings
          : await PointsTable.find({ tournament: tournamentId })
              .populate({
                path: "team",
                populate: { path: "registeredBy", select: "displayName email inGameName inGameId walletBalance" },
              })
              .sort({ totalPoints: -1, chickenDinners: -1 });

      if (standings[0]) winners.first = standings[0].team;
      if (standings[1]) winners.second = standings[1].team;
      if (standings[2]) winners.third = standings[2].team;

      const topMvp = await MVP.findOne({ tournament: tournamentId }).sort({
        kills: -1,
        damage: -1,
        survivalTime: -1,
      });

      if (topMvp) {
        const mvpUser = await User.findOne({
          $or: [{ inGameName: topMvp.playerName }, { displayName: topMvp.playerName }],
        });
        winners.mvp = {
          playerName: topMvp.playerName,
          teamName: topMvp.teamName,
          kills: topMvp.kills,
          user: mvpUser || null,
        };
      }
    }

    res.status(200).json({
      success: true,
      tournament,
      payouts: {
        totalCollection,
        hostAmount,
        platformAmount,
        prizePool,
        firstPrize,
        secondPrize,
        thirdPrize,
        fourthPrize,
        mvpPrize,
      },
      winners,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Credit wallets and complete tournament
const distributePrizes = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament Not Found" });
    }

    if (tournament.status === "completed") {
      return res.status(400).json({ message: "Prizes have already been distributed for this tournament." });
    }

    const totalCollection = tournament.entryFee * tournament.filledSlots;
    const hostAmount = (totalCollection * (tournament.hostFeePercent || 10)) / 100;
    const platformAmount = (totalCollection * (tournament.platformFeePercent || 10)) / 100;
    const prizePool = Math.max(0, totalCollection - hostAmount - platformAmount);

    const firstPrize = Math.floor(prizePool * 0.6);
    const secondPrize = Math.floor(prizePool * 0.25);
    const thirdPrize = Math.floor(prizePool * 0.1);
    const mvpPrize = Math.floor(prizePool * 0.05);

    const standings = await PointsTable.find({ tournament: tournamentId })
      .populate("team")
      .sort({ totalPoints: -1, chickenDinners: -1 });

    const prizeAllocations = [
      { teamEntry: standings[0], amount: firstPrize, place: "1st Place" },
      { teamEntry: standings[1], amount: secondPrize, place: "2nd Place" },
      { teamEntry: standings[2], amount: thirdPrize, place: "3rd Place" },
    ];

    const distributionLog = [];

    for (const alloc of prizeAllocations) {
      if (alloc.teamEntry && alloc.teamEntry.team && alloc.teamEntry.team.registeredBy && alloc.amount > 0) {
        const userId = alloc.teamEntry.team.registeredBy;
        const user = await User.findById(userId);

        if (user) {
          user.walletBalance += alloc.amount;
          user.totalWinnings += alloc.amount;
          await user.save();

          await WalletTransaction.create({
            user: user._id,
            amount: alloc.amount,
            type: "winnings",
            status: "completed",
            description: `Prize winnings for ${alloc.place} in ${tournament.title}`,
          });

          distributionLog.push({
            user: user.displayName,
            team: alloc.teamEntry.team.teamName,
            place: alloc.place,
            amount: alloc.amount,
          });
        }
      }
    }

    const topMvp = await MVP.findOne({ tournament: tournamentId }).sort({
      kills: -1,
      damage: -1,
      survivalTime: -1,
    });

    if (topMvp && mvpPrize > 0) {
      const mvpUser = await User.findOne({
        $or: [{ inGameName: topMvp.playerName }, { displayName: topMvp.playerName }],
      });

      if (mvpUser) {
        mvpUser.walletBalance += mvpPrize;
        mvpUser.totalWinnings += mvpPrize;
        await mvpUser.save();

        await WalletTransaction.create({
          user: mvpUser._id,
          amount: mvpPrize,
          type: "winnings",
          status: "completed",
          description: `MVP Award Winner in ${tournament.title}`,
        });

        distributionLog.push({
          user: mvpUser.displayName,
          place: "MVP Award",
          amount: mvpPrize,
        });
      }
    }

    tournament.status = "completed";
    await tournament.save();

    res.status(200).json({
      success: true,
      message: "Prize money distributed to player wallets successfully!",
      distributionLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTournamentCalculations,
  distributePrizes,
};