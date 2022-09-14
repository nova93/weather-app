import AirIcon from "@mui/icons-material/Air";
import SouthIcon from "@mui/icons-material/South";
import { SvgIcon, Typography } from "@mui/material";

import type { Details } from "../../../pages";

const WIND_UNITS = "m/s";

type WindProps = {
  value: Details["wind"];
};

const Wind = ({ value }: WindProps) => (
  <>
    <SvgIcon component={AirIcon} />
    <Typography variant="body1">{`${value.speed} ${WIND_UNITS}`}</Typography>
    <Typography variant="body1">
      Gusting to {`${value.gust} ${WIND_UNITS}`}
    </Typography>
    <SvgIcon
      component={SouthIcon}
      sx={{ transform: `rotate(${value.deg}deg)` }}
    />
    <Typography variant="body1">From {value.deg}&#xb0;</Typography>
  </>
);

export default Wind;
