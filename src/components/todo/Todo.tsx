import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import userStore from '../../store/userStore';

interface Props {
  todo: { todoTitle: string; todoSeq: number };
  onModify: (params: {
    todoSeq: number;
    oauthId: string;
    changeTitle: string;
  }) => void;
  onDelete: (params: { todoSeq: number; oauthId: string }) => void;
  index: number;
}
const Todo = ({ todo, onModify, onDelete, index }: Props) => {
  const { todoTitle, todoSeq } = todo;
  const { userInfo } = userStore();
  const location = useLocation();
  //todo title 수정
  const [text, setText] = useState(todoTitle);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //todo 수정
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) =>
    onDelete({ todoSeq: todoSeq, oauthId: userInfo.userOauthId });

  return (
    <>
      {!isChecked ? (
        <Draggable index={index} draggableId={String(todoSeq)}>
          {(provided) => (
            <Title
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
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
          )}
        </Draggable>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder={todoTitle}
            value={text}
            onChange={handleChange}
          />
          <Button>save</Button>
        </Form>
      )}
    </>
  );
};

export default Todo;

const Title = tw.li`
bg-realWhite
text-slate-800
flex
justify-between
cursor-pointer
rounded-sm
shadow-sm
m-2
p-1
text-[1.0rem]
`;
const Icon = tw.div`
text-slate-400
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
font-bold
text-white
opacity-90
bg-dullPurple
w-fit
p-1
rounded-sm
`;
