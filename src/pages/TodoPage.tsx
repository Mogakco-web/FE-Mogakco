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
      <AddCategory>+ Add another Category</AddCategory>
    </Container>
  );
};

export default TodoPage;

const Container = tw.div`
flex
flex-wrap
gap-4
`;
const AddCategory = tw.button`
bg-dullWhite
opacity-80
flex
rounded-md
h-fit
w-[300px]
p-3
`;
