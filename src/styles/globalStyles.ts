import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  body {
    font-family: 'SUIT-Regular';
    width: 100vw;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f6fa;
    color: #272F3F;
  }

  main {
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: 0 10% 0 10%;
    position: relative;
  }
`;
