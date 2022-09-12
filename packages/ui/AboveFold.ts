import styled from "styled-components";

export const AboveFold = styled.div<{ bgimage: string }>`
  padding: 2rem;
  min-height: 100vh;
  background-image: url("${(p) => p.bgimage}");
  background-size: cover;
  background-position: center;
`;
