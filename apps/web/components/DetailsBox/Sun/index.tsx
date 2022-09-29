import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import { SvgIcon, Typography } from "@mui/material";

import type { Details } from "../../../pages";

type SunProps = {
  value: Details["sun"];
};

const Sun = ({ value }: SunProps) => {
  const sunrise = new Date(value.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(value.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <SvgIcon component={WbSunnyIcon} />
      <Typography variant="body1">{sunrise}</Typography>
      <SvgIcon component={WbTwilightIcon} />
      <Typography variant="body1">{sunset}</Typography>
    </>
  );
};

export default Sun;
