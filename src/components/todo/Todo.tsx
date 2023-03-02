import React, { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import tw from 'tailwind-styled-components';

const Todo = ({ todo, onModify }: any) => {
  const { title, category } = todo;
  const [text, setText] = useState(title);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: any) => {
    setText(e.target.value);
    onModify({ title: text });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    setText(title);
  };
  return (
    <>
      {!isChecked ? (
        <Title>
          {title}
          <button
            onClick={() => {
              setIsChecked((prev) => !prev);
            }}>
            <FiEdit3 />
          </button>
        </Title>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='modify'
            value={title}
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      )}
    </>
  );
};

export default Todo;

const Title = tw.li`
bg-white
flex
justify-between
rounded-sm
m-2
p-1
`;
