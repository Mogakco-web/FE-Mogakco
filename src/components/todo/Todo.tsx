import React, { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import tw from 'tailwind-styled-components';

const Todo = ({ todo, onModify }: any) => {
  const { title, category } = todo;
  //todo title 수정
  const [text, setText] = useState(title);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onModify({ ...todo, title: text });
    setIsChecked(false);
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
m-2
p-1
`;
const Form = tw.form`
flex
h-fit
justify-center
m-2
`;
const Input = tw.input`
w-[245px]
h-7
rounded-sm
`;
const Button = tw.button`
text-sm
bg-dullSky
w-fit
p-1
rounded-sm
`;
