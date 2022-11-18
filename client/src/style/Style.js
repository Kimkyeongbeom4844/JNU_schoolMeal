import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    box-sizing: border-box;
  }
  .carousel-indicators {
    margin-bottom : 0;
  }
  .carousel-control-next , .carousel-control-prev {
    background-color: #ffb04c;
    width : 10%;
  }
`;
