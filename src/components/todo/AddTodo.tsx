import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import userStore from '../../store/userStore';

interface Props {
  onAdd: (params: {
    oauthId: string;
    todoTitle: string;
    categoryName: string;
  }) => void;
  category: string;
}

const AddTodo = ({ onAdd, category }: Props) => {
  const [text, setText] = useState('');
  const { userInfo } = userStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onAdd({
      oauthId: userInfo.userOauthId,
      todoTitle: text,
      categoryName: category,
    });
    setText('');
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Enter a title fot this todo!'
          value={text}
          onChange={handleChange}
        />
        <Button>Add Todo</Button>
      </Form>
    </>
  );
};

export default AddTodo;

const Form = tw.form`
flex
flex-col
justify-between
rounded-sm
m-2
p-1
`;
const Input = tw.input`
bg-white
h-10
p-1
ml-1
mb-1
rounded-sm
`;
const Button = tw.button`
bg-dullSky
opacity-90
text-white
text-sm
p-1
ml-auto
rounded-sm
flex
justify-end
`;
