import React from 'react';
import { Outlet } from 'react-router-dom';
import { TodoApiProvider } from '../context/TodoApiContext';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <TodoApiProvider>
        <main>
          <Outlet />
        </main>
      </TodoApiProvider>
    </>
  );
};

export default Layout;
