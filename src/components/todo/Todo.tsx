import React, { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

import tw from 'tailwind-styled-components';
import userStore from '../../store/userStore';

const Todo = ({ todo, onModify, onDelete }: any) => {
  const { todoTitle, todoSeq } = todo;
  const { userInfo } = userStore();
  const location = useLocation();
  //todo title 수정
  const [text, setText] = useState(todoTitle);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  //todo 수정
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onModify({
      todoSeq: todoSeq,
      oauthId: userInfo.userOauthId,
      changeTitle: text,
    });
    setIsChecked(false);
  };
  //todo 삭제
  const handleDelete = (e: any) =>
    onDelete({ todoSeq: todoSeq, oauthId: userInfo.userOauthId });

  return (
    <>
      {!isChecked ? (
        <Title>
          <Link
            className='w-full'
            to={String(todoSeq)}
            state={{ background: location, data: todo }}>
            {todoTitle}
          </Link>
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
            placeholder={todoTitle}
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
text-white
opacity-90
bg-dullSky
w-fit
p-1
rounded-sm
`;
