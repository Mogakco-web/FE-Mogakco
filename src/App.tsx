import React from 'react';
import tw from 'tailwind-styled-components';
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hi>테일윈드 컴포넌트 테스트</Hi>
      </header>
    </div>
  );
}

export default App;

const Hi = tw.div`
w-fit
bg-red-500
`;
