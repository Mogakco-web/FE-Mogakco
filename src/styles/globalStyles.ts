import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  body {
    font-family: 'NanumSquareNeo-Variable';
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
