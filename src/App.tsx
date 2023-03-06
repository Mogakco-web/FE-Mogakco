import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import TimeModal from './components/stopwatch/TimeModal';
import useStopwatch from './hook/stopwatch';
import Home from './pages/Home';
import Login from './pages/Login';
import CallBack from './pages/CallBack';
import Main from './pages/Main';
import Ranking from './pages/Ranking';
import Stopwatch from './pages/Stopwatch';
import TodoPage from './pages/TodoPage';

function App() {
  const location = useLocation();
  const stopwatchProps = useStopwatch();
  const hiddenPaths: string[] = ['/', '/timer', '/login'];

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/main' element={<Main />}></Route>
          <Route path='/callback' element={<CallBack />}></Route>
          <Route path='/todo' element={<TodoPage />}></Route>
          <Route path='/rank' element={<Ranking />}></Route>
          <Route
            path='/timer'
            element={<Stopwatch props={stopwatchProps} />}></Route>
        </Route>
      </Routes>
      {!hiddenPaths.includes(location.pathname) && <TimeModal />}
    </>
  );
}

export default App;
