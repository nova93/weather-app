import styled from "@emotion/styled";

import theme from "../theme";

export const AboveFold = styled.div<{ bgimage: string }>`
  padding: ${theme.spacing(4)};
  min-height: 100vh;
  background-image: url("${(p) => p.bgimage}");
  background-size: cover;
  background-position: center;
`;
