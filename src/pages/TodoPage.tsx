import React, { useState } from 'react';
import TodoList from '../components/todo/TodoList';
import tw from 'tailwind-styled-components';

const TodoPage = () => {
  const [category, setCategory] = useState(['Todo', 'Doing', 'Done']);
  return (
    <Container>
      {category.map((item, index) => (
        <TodoList key={index} filter={item} />
      ))}
    </Container>
  );
};

export default TodoPage;

const Container = tw.div`
flex
flex-wrap
gap-4
`;
