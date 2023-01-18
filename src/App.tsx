import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import useStopwatch from './hook/useStopwatch';
import Home from './pages/Home';
import Main from './pages/Main';
import Ranking from './pages/Ranking';
import Stopwatch from './pages/Stopwatch';

function App() {
  const stopwatchProps = useStopwatch();
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/main' element={<Main />}></Route>
          <Route path='/rank' element={<Ranking />}></Route>
          <Route
            path='/timer'
            element={<Stopwatch props={stopwatchProps} />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
