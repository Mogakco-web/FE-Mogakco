import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { FiChevronUp, FiMoreHorizontal } from 'react-icons/fi';

const Category = ({ filter }: any) => {
  const [view, setView] = useState(false);
  return (
    <Div>
      <Name>{filter}</Name>
      {filter !== 'Todo' ? (
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
                  <li>삭제</li>
                  <li>수정</li>
                </Dropdown>
              )}
            </div>
          </Modal>
        </More>
      ) : null}
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
