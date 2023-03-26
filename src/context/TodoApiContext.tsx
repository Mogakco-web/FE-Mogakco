import { createContext, useContext } from 'react';
import TodolistApi from '../api/todolistApi';

export const TodoApiContext = createContext<any | undefined>(undefined);

const todos = new TodolistApi();

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
