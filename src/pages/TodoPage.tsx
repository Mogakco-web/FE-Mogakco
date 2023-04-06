import React, { useState } from 'react';
import TodoList from '../components/todo/TodoList';
import tw from 'tailwind-styled-components';
import AddCategory from '../components/todo/AddCategory';
import { FiX } from 'react-icons/fi';
import userStore from '../store/userStore';
import { useQuery, useQueryClient } from 'react-query';
import { useTodoApi } from '../context/TodoApiContext';
import {
  DragDropContext,
  DragStart,
  DraggableId,
  DropResult,
  Droppable,
  ResponderProvided,
} from 'react-beautiful-dnd';
import api from '../api/ApiController';

const TodoPage = () => {
  const { userInfo } = userStore();
  const [addOpen, setAddOpen] = useState(false);
  const [dragItem, setDragItem] = useState('');
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
  //드래그 드롭 기능
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // 드롭이 droppable 밖에서 일어났을 경우 바로 return
    if (!destination) return;
    // 드래그가 발생한 위치와 드롭이 발생한 위치가 같을 경우 바로 return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    //드래그가 발생한 아이템 드롭이 발생한 곳으로 카테고리 변경 요청
    changeCategory(dragItem, destination.droppableId);
  };
  const handleDragStart = (start: DragStart) => {
    const { draggableId } = start;
    setDragItem(draggableId);
  };
  const changeCategory = async (itemId: any, newCategoryId: any) => {
    await api.put('/api/v1/todo/category', {
      todoSeq: itemId,
      categorySeq: newCategoryId,
    });
    // .then((res) => console.log(res.data));
    await queryClient.invalidateQueries(['todolist']);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Container>
        {isLoading && <p>로딩 중!</p>}
        {categoryList &&
          categoryList.map(
            (item: { categorySeq: number; categoryName: string }) => (
              <TodoList
                key={item.categorySeq}
                filter={item.categoryName}
                filterId={item.categorySeq}
              />
            ),
          )}
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
    </DragDropContext>
  );
};

export default TodoPage;

const Container = tw.div`
grid
grid-flow-col
gap-4
relative
m-10
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
