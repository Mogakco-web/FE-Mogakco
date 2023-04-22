import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

const AddCategory = ({ onAdd }: any) => {
  const [text, setText] = useState('');

  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onAdd(text);
    setText('');
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='📁 새로운 카테고리 이름을 정해주세요!'
          value={text}
          onChange={handleChange}
        />
        <Button>Add</Button>
      </Form>
    </>
  );
};

export default AddCategory;

const Form = tw.form`
flex
flex-col
justify-between
h-full
p-2
`;
const Input = tw.input`
bg-[#f8f7fd]
h-10
p-1
ml-1
mb-1
rounded-sm
`;
const Button = tw.button`
bg-dullPurple
text-white
font-bold
opacity-90
text-sm
p-1
mt-2
ml-auto
rounded-sm
flex
justify-end
`;
