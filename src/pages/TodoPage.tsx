import React, { useState } from 'react';
import TodoList from '../components/todo/TodoList';
import tw from 'tailwind-styled-components';
import AddCategory from '../components/todo/AddCategory';
import { FiX } from 'react-icons/fi';

const TodoPage = () => {
  const [category, setCategory] = useState(['Todo', 'Doing', 'Done']);
  const [addOpen, setAddOpen] = useState(false);
  const handleAdd = (text: string) => {
    setCategory([...category, text]);
  };
  return (
    <Container>
      {category.map((item, index) => (
        <TodoList key={index} filter={item} />
      ))}
      {!addOpen ? (
        <AddBox onClick={() => setAddOpen((prev) => !prev)}>
          + Add another Category
        </AddBox>
      ) : (
        <AddBox>
          <XButton
            onClick={() => {
              setAddOpen((prev) => !prev);
            }}>
            <FiX />
          </XButton>
          <AddCategory onAdd={handleAdd} />
        </AddBox>
      )}
    </Container>
  );
};

export default TodoPage;

const Container = tw.div`
flex
flex-wrap
gap-4
`;
const AddBox = tw.div`
bg-gray-300
text-gray-600
flex
flex-col
rounded-md
cursor-pointer
h-fit
w-[300px]
p-3
shadow-inner
`;
const XButton = tw.button`
text-dullGrey
p-1
ml-auto
w-fit
h-fit
flex
justify-start
`;
