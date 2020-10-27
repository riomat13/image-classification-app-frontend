import { createGlobalStyle } from 'styled-components';

export const BaseStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  body: {
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }

  #root {
    width: 100%;
    height: 100vh;
  }
`;
