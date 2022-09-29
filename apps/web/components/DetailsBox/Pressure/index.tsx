import CompressIcon from "@mui/icons-material/Compress";
import { SvgIcon, Typography } from "@mui/material";

import type { Details } from "../../../pages";

type PressureProps = {
  value: Details["pressure"];
};

const Pressure = ({ value }: PressureProps) => (
  <>
    <SvgIcon component={CompressIcon} />
    <Typography variant="body1">{value} hPA</Typography>
  </>
);

export default Pressure;
