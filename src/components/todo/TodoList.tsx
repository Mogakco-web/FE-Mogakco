import React, { useState } from 'react';
import Todo from './Todo';
import tw from 'tailwind-styled-components';
import AddTodo from './AddTodo';
import data from './mockup-data.json';

const TodoList = ({ filter }: any) => {
  const [list, setList] = useState(data);
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
  const filtered = list.filter((item) => item.category === filter);

  return (
    <Section>
      <Category>{filter}</Category>
      <ul>
        {filtered.map((item) => (
          <Todo key={item.id} todo={item} onModify={handleModify} />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
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
`;
const Category = tw.h2`
font-bold
m-2
`;
