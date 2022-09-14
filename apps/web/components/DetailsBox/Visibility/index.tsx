import VisibilityIcon from "@mui/icons-material/Visibility";
import { SvgIcon, Typography } from "@mui/material";

import type { Details } from "../../../pages";

type VisibilityProps = {
  value: Details["visibility"];
};

const Visibility = ({ value }: VisibilityProps) => {
  const distance =
    value === 10000 ? "over 10km" : `${(value / 1000).toFixed(2)}`;
  return (
    <>
      <SvgIcon component={VisibilityIcon} />
      <Typography variant="body1">{distance}</Typography>
    </>
  );
};

export default Visibility;
