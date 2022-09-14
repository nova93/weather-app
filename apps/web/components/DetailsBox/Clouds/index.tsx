import CloudIcon from "@mui/icons-material/Cloud";
import { SvgIcon, Typography } from "@mui/material";

import type { Details } from "../../../pages";

type CloudsProps = {
  value: Details["clouds"];
};

const Clouds = ({ value }: CloudsProps) => (
  <>
    <SvgIcon component={CloudIcon} />
    <Typography variant="body1">{value.all}%</Typography>
  </>
);

export default Clouds;
