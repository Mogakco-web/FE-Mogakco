import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Ranking from './pages/Ranking';
import Timer from './pages/Timer';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/rank' element={<Ranking />}></Route>
        <Route path='/timer' element={<Timer />}></Route>
      </Routes>
    </>
  );
}

export default App;
