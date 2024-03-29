import React, { useState } from 'react';
import Todo from './Todo';
import tw from 'tailwind-styled-components';
import AddTodo from './AddTodo';
import { FiX } from 'react-icons/fi';
import Category from './Category';
import { useTodoApi } from '../../context/TodoApiContext';
import { useQuery, useQueryClient } from 'react-query';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  filter: string;
  filterId: number;
}

const TodoList = ({ filter, filterId }: Props) => {
  const [addOpen, setAddOpen] = useState(false);
  const queryClient = useQueryClient();
  const { todos } = useTodoApi();
  //투두 리스트 조회
  const { isLoading, data: todolist } = useQuery(['todolist', filterId], () =>
    todos.getTodolist(filterId),
  );
  //투두 생성
  const handleAdd = async (todo: {
    oauthId: string;
    todoTitle: string;
    categoryName: string;
  }) => {
    await todos.createTodo(todo);
    await queryClient.invalidateQueries(['todolist']);
    setAddOpen((prev) => !prev);
  };
  //투두 수정
  const handleModify = async (modified: {
    todoSeq: number;
    oauthId: string;
    changeTitle: string;
  }) => {
    await todos.modifyTodo(modified);
    await queryClient.invalidateQueries(['todolist']);
  };
  //투두 삭제
  const handleDelete = async (deleted: {
    todoSeq: number;
    oauthId: string;
  }) => {
    await todos.deleteTodo(deleted);
    await queryClient.invalidateQueries(['todolist']);
  };
  // console.log(todolist);
  return (
    <Section>
      <Category filter={filter} filterId={filterId}></Category>
      {isLoading && <p>로딩중...</p>}
      <Droppable droppableId={String(filterId)}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul>
              {todolist &&
                todolist.map(
                  (
                    item: { todoSeq: number; todoTitle: string },
                    index: number,
                  ) => (
                    <Todo
                      todo={item}
                      index={index}
                      key={index}
                      onModify={handleModify}
                      onDelete={handleDelete}
                    />
                  ),
                )}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
      {addOpen ? (
        <AddCard>
          <XButton
            onClick={() => {
              setAddOpen((prev) => !prev);
            }}>
            <FiX />
          </XButton>
          <AddTodo onAdd={handleAdd} category={filter} />
        </AddCard>
      ) : (
        <Button
          onClick={() => {
            setAddOpen((prev) => !prev);
          }}>
          + Add a todo
        </Button>
      )}
    </Section>
  );
};

export default TodoList;

const Section = tw.section`
bg-[#f8f7fd]
md:w-60
lg:w-80
w-[300px]
h-full
p-2
flex
flex-col
rounded-md
shadow-sm
`;
const Button = tw.button`
text-gray-600
m-2
p-1
flex
justify-start
`;
const AddCard = tw.div`
flex
flex-col
bg-realWhite
shadow-md
rounded-sm
m-2
`;
const XButton = tw.button`
text-dullGrey
p-1
ml-auto
w-fit
flex
justify-end
`;
