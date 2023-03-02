import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

//임시 임의의 id값 위해서
let random = 9;
const AddTodo = ({ onAdd }: any) => {
  const [text, setText] = useState('');
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //임시 임의의 id값 위해서
    random++;
    if (text.trim().length === 0) return;
    onAdd({ id: random, title: text, contents: '', category: 'Todo' });
    setText('');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='Add Todo'
        value={text}
        onChange={handleChange}
      />
      <Button>+</Button>
    </Form>
  );
};

export default AddTodo;

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
bg-dullSky
w-6
rounded-sm
`;
