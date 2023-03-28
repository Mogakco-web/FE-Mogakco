import React, { useState } from 'react';
import TodoList from '../components/todo/TodoList';
import tw from 'tailwind-styled-components';
import AddCategory from '../components/todo/AddCategory';
import { FiX } from 'react-icons/fi';
import userStore from '../store/userStore';
import { useQuery, useQueryClient } from 'react-query';
import { useTodoApi } from '../context/TodoApiContext';

const TodoPage = () => {
  const { userInfo } = userStore();
  const [addOpen, setAddOpen] = useState(false);
  const queryClient = useQueryClient();
  const { todos } = useTodoApi();
  //카테고리 리스트 불러오기
  const { isLoading, data: categoryList } = useQuery(['categoryList'], () => {
    return todos.getCategory({
      oauthId: userInfo.userOauthId,
    });
  });
  //새 카테고리 추가
  const handleAdd = async (text: string) => {
    await todos.createCategory({
      oauthId: userInfo.userOauthId,
      category_name: text,
    });
    await queryClient.invalidateQueries(['categoryList']);
    setAddOpen((prev) => !prev);
  };
  return (
    <Container>
      {isLoading && <p>로딩 중!</p>}
      {categoryList &&
        categoryList.map((item: any, index: number) => (
          <TodoList
            key={index}
            filter={item.categoryName}
            filterId={item.categorySeq}
          />
        ))}
      {!addOpen ? (
        <AddBox onClick={() => setAddOpen((prev) => !prev)}>
          + Add another Category
        </AddBox>
      ) : (
        <AddBox>
          <XButton
            onClick={() => {
              setAddOpen((prev) => !prev);
            }}>
            <FiX />
          </XButton>
          <AddCategory onAdd={handleAdd} />
        </AddBox>
      )}
    </Container>
  );
};

export default TodoPage;

const Container = tw.div`
flex
flex-wrap
gap-4
`;
const AddBox = tw.div`
bg-gray-300
text-gray-600
flex
flex-col
rounded-md
cursor-pointer
h-fit
w-[300px]
p-3
shadow-inner
`;
const XButton = tw.button`
text-dullGrey
p-1
ml-auto
w-fit
h-fit
flex
justify-start
`;
