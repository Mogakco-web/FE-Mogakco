import React, { useState } from 'react';
import Todo from './Todo';
import tw from 'tailwind-styled-components';
import AddTodo from './AddTodo';
import { FiX } from 'react-icons/fi';
import Category from './Category';
import { useTodoApi } from '../../context/TodoApiContext';
import { useQuery, useQueryClient } from 'react-query';
import modalStore from '../../store/modalStore';

const TodoList = ({ filter, filterId }: any) => {
  const { modalOpen, setModalOpen } = modalStore();
  const [addOpen, setAddOpen] = useState(false);
  const queryClient = useQueryClient();
  const { todos } = useTodoApi();
  //투두 리스트 조회
  const { isLoading, data: todolist } = useQuery(['todolist', filterId], () =>
    todos.getTodolist(filterId),
  );
  //투두 생성
  const handleAdd = async (todo: any) => {
    await todos.createTodo(todo);
    await queryClient.invalidateQueries(['todolist']);
    setAddOpen((prev) => !prev);
  };
  //투두 수정
  const handleModify = async (modified: any) => {
    await todos.modifyTodo(modified);
    await queryClient.invalidateQueries(['todolist']);
  };
  //투두 삭제
  const handleDelete = async (deleted: any) => {
    await todos.deleteTodo(deleted);
    await queryClient.invalidateQueries(['todolist']);
  };

  return (
    <Section>
      <Category filter={filter} filterId={filterId}></Category>
      {isLoading && <p>로딩중...</p>}
      {todolist &&
        todolist.map((item: any) => (
          <ul>
            <div onClick={() => setModalOpen()}>
              <Todo
                key={item.todoSeq}
                todo={item}
                onModify={handleModify}
                onDelete={handleDelete}
              />
            </div>
          </ul>
        ))}
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
bg-gray-300
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
bg-white
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
