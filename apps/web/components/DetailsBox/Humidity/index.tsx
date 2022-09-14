import CompressIcon from "@mui/icons-material/Compress";
import { SvgIcon, Typography } from "@mui/material";

import type { Details } from "../../../pages";

type HumidityProps = {
  value: Details["humidity"];
};

const Humidity = ({ value }: HumidityProps) => (
  <>
    <SvgIcon component={CompressIcon} />
    <Typography variant="body1">{value}%</Typography>
  </>
);

export default Humidity;
