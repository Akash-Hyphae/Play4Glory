import { Box, Typography, Divider } from "@mui/material";

const OverviewTab = ({ tournament }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Tournament Details
      </Typography>

      <Typography sx={{ mb: 1 }}>
        🏆 Mode: {tournament.mode.toUpperCase()}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        💰 Prize Pool: {tournament.prizepool}
      </Typography>
      <Typography sx={{ mb: 1 }}>🎟 Entry Fee: {tournament.entry}</Typography>
      <Typography sx={{ mb: 1 }}>
        👥 Players Joined: {tournament.players}
      </Typography>

      <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Rewards Distribution
      </Typography>

      <Typography>🥇 1st: {tournament.rewards.first}</Typography>
      <Typography>🥈 2nd: {tournament.rewards.second}</Typography>
      <Typography>🥉 3rd: {tournament.rewards.third}</Typography>
      <Typography>⭐ MVP: {tournament.rewards.mvp}</Typography>

      <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Tournament Rules
      </Typography>

      <ol
        style={{
          paddingLeft: "20px",
          color: "#fff",
        }}
      >
        <li>
          All players agree to tournament rules once they register or
          participate
        </li>
        <li>Organizers can modify rules at any time</li>
        <li>Organizer decisions are final</li>
        <li>
          Players must meet nationality requirements (usually Indian for
          official events)
        </li>
        <li>Minimum age is generally 16 years (may vary)</li>
        <li>Guardian consent may be required for minors</li>
        <li>Each team must have 4 main players</li>
        <li>Substitutes are allowed only if registered before deadline</li>
        <li>
          A player cannot play for more than one team in the same tournament
        </li>
        <li>Roster changes after lock-in are not allowed without approval</li>
        <li>Players must use their registered in-game account only</li>
        <li>Account sharing is prohibited</li>
        <li>Unregistered accounts are not allowed</li>
        <li>Registered in-game name and team tag must be used</li>
        <li>Matches are played in custom rooms created by organizers</li>
        <li>Room ID and password are shared before match</li>
        <li>Players must join before deadline</li>
        <li>No entry after match starts</li>
        <li>No re-entry once match begins</li>
        <li>Mode is Squad (4 players)</li>
        <li>Usually played in TPP mode</li>
        <li>Maps are decided by organizers</li>
        <li>Normally 16 teams (64 players) per match</li>
        <li>Players must follow official schedule</li>
        <li>Intentional disconnections are prohibited</li>
        <li>Match continues even if a player disconnects</li>
        <li>Internet issues are player responsibility</li>
        <li>Hacks, cheats, scripts are strictly banned</li>
        <li>Third-party unfair advantage apps are prohibited</li>
        <li>Bug or glitch abuse is not allowed</li>
        <li>Emulators are not allowed in mobile-only tournaments</li>
        <li>Tablets may be restricted depending on rules</li>
        <li>Rooted or jailbroken devices are not allowed</li>
        <li>Stream sniping is banned</li>
        <li>Ghosting is prohibited</li>
        <li>Teaming with opponents is illegal</li>
        <li>Sharing room ID/password publicly is prohibited</li>
        <li>Abusive or toxic behavior can lead to penalties</li>
        <li>Harassment or discrimination leads to disqualification</li>
        <li>Suspicious gameplay may be investigated</li>
        <li>Organizers may request POV recordings</li>
        <li>Players must submit POV if asked</li>
        <li>Failure to provide proof can cause disqualification</li>
        <li>Result screenshots may be required</li>
        <li>Refusing anti-cheat checks leads to removal</li>
        <li>Total points = Placement points + Kill points</li>
        <li>1 point per kill</li>
        <li>Placement points depend on finishing rank</li>
        <li>
          Standard placement example: 1st 10, 2nd 6, 3rd 5, 4th 4, 5th 3, 6th 2,
          7th-8th 1, others 0
        </li>
        <li>Tie-breaker usually based on total kills</li>
        <li>Further tie-breaker may consider last match performance</li>
        <li>Prize money given after verification</li>
        <li>Cheating leads to prize cancellation</li>
        <li>Serious violations can cause permanent ban</li>
        <li>Impersonation is prohibited</li>
        <li>Unsportsmanlike conduct can result in penalties</li>
        <li>Coaching rules may apply during live matches</li>
        <li>Unauthorized streaming may be restricted</li>
        <li>Sponsor guidelines must be followed</li>
        <li>Match fixing is strictly banned</li>
        <li>Betting on own matches is prohibited</li>
        <li>Rule violations must be reported</li>
        <li>Offensive team/player names are not allowed</li>
        <li>Professional behavior is required</li>
        <li>Referees may spectate matches</li>
        <li>Admins may restart matches in rare cases</li>
        <li>Restart decisions are organizer-controlled</li>
        <li>Leaving tournament midway may cause ban</li>
        <li>Official communication channels must be used</li>
        <li>Identity verification may be required</li>
        <li>Fraudulent activity leads to disqualification</li>
        <li>Players must attend official briefings if required</li>
        <li>LAN hardware must not be tampered with</li>
        <li>External communication tools may be restricted in LAN</li>
        <li>
          Any rule violation can result in warning, point deduction, match loss,
          disqualification, or ban
        </li>
      </ol>
    </Box>
  );
};

export default OverviewTab;
