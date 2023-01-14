import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'S-CoreDream-4Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'S-CoreDream-4Regular';
    width: 100vw;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: 0 10% 0 10%;
    position: relative;
  }

  `;
