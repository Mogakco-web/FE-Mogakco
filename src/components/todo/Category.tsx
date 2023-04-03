import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { FiChevronUp, FiMoreHorizontal } from 'react-icons/fi';
import userStore from '../../store/userStore';
import { useTodoApi } from '../../context/TodoApiContext';
import { useQueryClient } from 'react-query';

interface Props {
  filter: string;
  filterId: number;
}

const Category = ({ filter, filterId }: Props) => {
  const [view, setView] = useState(false);
  const { todos } = useTodoApi();
  const queryClient = useQueryClient();

  const { userInfo } = userStore();
  const body = {
    oauthId: userInfo.userOauthId,
  };
  const [text, setText] = useState(filter);
  //더보기 클릭 체크
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    handleModify();
    setIsChecked(false);
  };
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  //카테고리 수정
  const handleModify = async () => {
    await todos.modifyCategory({
      ...body,
      categoryOwn: filter,
      categoryGeu: text,
    });
    await queryClient.invalidateQueries(['categoryList']);
  };
  //카테고리 삭제
  const handleDelete = async (e: any) => {
    await todos.deleteCategory({ ...body, categorySeq: filterId });
    await queryClient.invalidateQueries(['categoryList']);
  };

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
text-white
opacity-90
bg-dullSky
w-fit
p-1
rounded-sm
`;
