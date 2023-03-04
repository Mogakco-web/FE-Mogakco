import React, { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';

import tw from 'tailwind-styled-components';

const Todo = ({ todo, onModify, onDelete }: any) => {
  const { title } = todo;
  //todo title 수정
  const [text, setText] = useState(title);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onModify({ ...todo, title: text });
    setIsChecked(false);
  };
  //todo 삭제
  const handleDelete = (e: any) => onDelete(todo);

  return (
    <>
      {!isChecked ? (
        <Title>
          {title}
          <Icon>
            <button
              onClick={() => {
                setIsChecked((prev) => !prev);
              }}>
              <FiEdit3 />
            </button>
            <button onClick={handleDelete}>
              <RiDeleteBin5Line />
            </button>
          </Icon>
        </Title>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder={title}
            value={text}
            onChange={handleChange}
          />
          <Button>Save</Button>
        </Form>
      )}
    </>
  );
};

export default Todo;

const Title = tw.li`
bg-white
flex
justify-between
cursor-pointer
rounded-sm
shadow-md
m-2
p-1
`;
const Icon = tw.div`
flex
gap-2
`;
const Form = tw.form`
flex
h-fit
justify-center
m-2
`;
const Input = tw.input`
h-7
w-[257px]
p-1
rounded-sm
`;
const Button = tw.button`
text-sm
bg-dullSky
w-fit
p-1
rounded-sm
`;
