import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { FiChevronUp, FiMoreHorizontal } from 'react-icons/fi';

const Category = ({ filter }: any) => {
  const [view, setView] = useState(false);
  //category 수정
  const [text, setText] = useState(filter);
  //더보기 클릭 체크
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    setIsChecked(false);
  };
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleDelete = (e: any) => {};

  if (filter === 'Todo')
    return (
      <Div>
        <Name>{filter}</Name>
      </Div>
    );

  return (
    <Div>
      {!isChecked ? (
        <>
          <Name>{filter}</Name>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder={filter}
            value={text}
            onChange={handleChange}
          />
          <Button>save</Button>
        </Form>
      )}
      <More>
        <Modal
          onClick={() => {
            setView((prev) => !prev);
          }}>
          {view ? (
            <FiChevronUp className='ml-auto' />
          ) : (
            <FiMoreHorizontal className='ml-auto' />
          )}
          <div className='absolute'>
            {view && (
              <Dropdown>
                <List onClick={() => setIsChecked(true)}>수정</List>
                <List onClick={handleDelete}>삭제</List>
              </Dropdown>
            )}
          </div>
        </Modal>
      </More>
    </Div>
  );
};

export default Category;

const Div = tw.div`
flex
justify-between
font-bold
m-2
`;
const Name = tw.h2`
w-[300px]
`;
const More = tw.button`
`;
const Modal = tw.ul`
rounded-md
static
`;
const Dropdown = tw.div`
absolute
w-20
bg-white
text-dullGrey
text-sm
rounded-md
shadow-md
`;
const List = tw.li`
hover:text-blue
hover:bg-
`;
const Form = tw.form`
flex
h-fit
justify-center
`;
const Input = tw.input`
h-auto
w-[240px]
rounded-sm
`;
const Button = tw.button`
text-sm
bg-dullSky
w-fit
p-1
rounded-sm
`;
