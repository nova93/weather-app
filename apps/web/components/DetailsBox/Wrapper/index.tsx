import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

type WrapperProps = {
  title: string;
  children: JSX.Element;
};

const Wrapper = ({ children, title }: WrapperProps) => (
  <Grid item xs={6} md={3}>
    <Box
      sx={{
        boxShadow: 2,
        p: 2,
        borderRadius: 4,
      }}
    >
      <>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Divider />
        {children}
      </>
    </Box>
  </Grid>
);

export default Wrapper;
