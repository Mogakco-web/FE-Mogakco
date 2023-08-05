import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import TimeModal from './components/timer/TimeModal';
import Home from './pages/Home';
import Login from './pages/Login';
import CallBack from './pages/CallBack';
import Main from './pages/Main';
import Ranking from './pages/Ranking';
import Timer from './pages/Timer';
import TodoPage from './pages/TodoPage';
import TodoDetail from './components/todo/TodoDetail';
import TimerController from './components/timer/TimerController';
import RandomCS from './pages/RandomCS';
import MyPage from './pages/MyPage';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const hiddenPaths: string[] = ['/', '/timer', '/login'];
  const TimerControll = TimerController();
  return (
    <>
      {background && (
        <Routes>
          <Route path='/todo/:todoId' element={<TodoDetail />} />
        </Routes>
      )}
      <Routes location={background || location}>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/main' element={<Main />}></Route>
          <Route path='/mypage' element={<MyPage />}></Route>
          <Route path='/callback' element={<CallBack />}></Route>
          <Route path='/todo' element={<TodoPage />}></Route>
          <Route path='/rank' element={<Ranking />}></Route>
          <Route path='/random-cs' element={<RandomCS />}></Route>

          <Route
            path='/timer'
            element={<Timer props={TimerControll} />}></Route>
        </Route>
      </Routes>

      {!hiddenPaths.includes(location.pathname) && <TimeModal />}
    </>
  );
}

export default App;
