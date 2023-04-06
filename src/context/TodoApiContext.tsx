import { createContext, useContext } from 'react';
import TodolistApi from '../api/todolist';
import FakeTodoApi from '../api/todoMockup';

export const TodoApiContext = createContext<any | undefined>(undefined);

const todos = new TodolistApi();
// const todos = new FakeTodoApi();

export function TodoApiProvider({ children }: { children: React.ReactNode }) {
  return (
    <TodoApiContext.Provider value={{ todos }}>
      {children}
    </TodoApiContext.Provider>
  );
}

export function useTodoApi() {
  return useContext(TodoApiContext);
}
