import { Typography } from "@mui/material";

const OverviewTab = ({ tdm }) => {
  return (
    <>
      <Typography>
        Welcome to <b>{tdm.title}</b> — an exciting{" "}
        <b>{tdm.tournamentType}</b> knockout challenge.

        The tournament starts on{" "}
        <b>{new Date(tdm.startTime).toLocaleString()}</b>.

        Entry Fee: <b>₹{tdm.entryFee}</b>.

        Registered Teams: <b>{tdm.filledSlots}/{tdm.maxSlots}</b>.
      </Typography>

      <ul className="mt-4 list-disc pl-5">
        <li>Only M416 is allowed</li>
        <li>Grenades are not allowed</li>
        <li>No exploiting bugs or glitches</li>
        <li>Sliding should be disabled</li>
        <li>Any cheating will result in disqualification</li>
        <li>Organizer decisions are final</li>
      </ul>
    </>
  );
};

export default OverviewTab;