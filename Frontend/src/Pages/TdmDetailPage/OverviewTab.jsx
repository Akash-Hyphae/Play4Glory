import { Typography } from "@mui/material";

const OverviewTab = ({ tdm }) => {
  return (
    <>
    <Typography>
      Welcome to <b>{tdm.title}</b> — an exciting {tdm.mode} knockout
      challenge with a total prizepool of {tdm.prizepool}.
      Entry fee: {tdm.entry}. Only the best teams will survive!
    </Typography>
    <ul className="mt-3">
      <li>Only M416 is allowed</li>
      <li>Granades are not allowed</li>
      <li>No exploiting bugs/glitches</li>
      <li>Sliding should be off</li>
    </ul>
    </>
  );
};

export default OverviewTab;