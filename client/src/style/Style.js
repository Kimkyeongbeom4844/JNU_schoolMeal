import styled, { createGlobalStyle } from "styled-components";
import { Container } from "react-bootstrap";

export const GlobalStyle = createGlobalStyle`
  :root {
    --boldOrange : #f57f17;
    --midOrange : #ffb04c;
  }
  * {
    box-sizing: border-box;
    user-select: none;
    font-size: .8rem;
  }
  .carousel-indicators {
    margin-bottom : 0;
  }
  .carousel-control-next , .carousel-control-prev {
    background-color: var(--midOrange);
    width : 8%;
  }
`;

export const BoldOrange = styled(Container)`
  background-color: var(--boldOrange);
`;
