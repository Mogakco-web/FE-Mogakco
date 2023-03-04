import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

//임시 임의의 id값 위해서
let random = 9;
const AddTodo = ({ onAdd, category }: any) => {
  const [text, setText] = useState('');
  console.log(category);

  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //임시 임의의 id값 위해서
    random++;
    if (text.trim().length === 0) return;
    onAdd({ id: random, title: text, contents: '', category });
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
