import Box from "@mui/system/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Clouds from "./Clouds";
import Humidity from "./Humidity";
import Pressure from "./Pressure";
import Wrapper from "./Wrapper";
import Wind from "./Wind";
import Visibility from "./Visibility";
import type { Details } from "../../pages";
import Sun from "./Sun";

const DetailsBox = ({ data }: { data: Details }) => (
  <Container sx={{ p: 4, bgcolor: "primary.light" }} maxWidth={false}>
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 4,
      }}
    >
      <Typography variant="h4" component="h2">
        Details
      </Typography>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 2, sm: 4, md: 6 }}
        mt={2}
      >
        <Wrapper title="Clouds">
          <Clouds value={data.clouds} />
        </Wrapper>
        <Wrapper title="Humidity">
          <Humidity value={data.humidity} />
        </Wrapper>
        <Wrapper title="Pressure">
          <Pressure value={data.pressure} />
        </Wrapper>
        <Wrapper title="Visibility">
          <Visibility value={data.visibility} />
        </Wrapper>
        <Wrapper title="Wind">
          <Wind value={data.wind} />
        </Wrapper>
        <Wrapper title="Sun">
          <Sun value={data.sun} />
        </Wrapper>
      </Grid>
    </Box>
  </Container>
);

export default DetailsBox;
