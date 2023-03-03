import React, { useState } from 'react';
import Todo from './Todo';
import tw from 'tailwind-styled-components';
import AddTodo from './AddTodo';
import data from './mockup-data.json';
import { FiX } from 'react-icons/fi';

const TodoList = ({ filter }: any) => {
  const [list, setList] = useState(data);
  const [addOpen, setAddOpen] = useState(false);
  const handleAdd = (todo: {
    id: string;
    title: string;
    contents: string;
    category: string;
  }) => {
    setList([...list, todo]);
  };
  const handleModify = (modified: any) => {
    setList(list.map((t) => (t.id === modified.id ? modified : t)));
  };
  const handleDelete = (deleted: any) => {
    setList(list.filter((t) => t.id !== deleted.id));
  };
  const filtered = list.filter((item) => item.category === filter);

  return (
    <Section>
      <Category>{filter}</Category>
      <ul>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onModify={handleModify}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {addOpen ? (
        <AddCard>
          <XButton
            onClick={() => {
              setAddOpen((prev) => !prev);
            }}>
            <FiX />
          </XButton>
          <AddTodo onAdd={handleAdd} />
        </AddCard>
      ) : (
        <Button
          onClick={() => {
            setAddOpen((prev) => !prev);
          }}>
          + Add a todo
        </Button>
      )}
    </Section>
  );
};

export default TodoList;

const Section = tw.section`
bg-dullWhite
w-[300px]
h-full
p-2
flex
flex-col
rounded-md
shadow-inner
`;
const Category = tw.h2`
font-bold
m-2
`;
const Button = tw.button`
text-dullGrey
m-2
p-1
flex
justify-start
`;
const AddCard = tw.div`
flex
flex-col
bg-white
shadow-md
rounded-sm
m-2
`;
const XButton = tw.button`
text-dullGrey
p-1
ml-auto
w-fit
flex
justify-end
`;
