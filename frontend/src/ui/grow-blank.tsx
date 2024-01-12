import styled from "styled-components";

const StyledGrowBlank = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  flex-grow: 1;
`;

export default function GrowBlank() {
  return <StyledGrowBlank />;
}
