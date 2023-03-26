import React, { useState } from 'react';
import Todo from './Todo';
import tw from 'tailwind-styled-components';
import AddTodo from './AddTodo';
import data from './mockup-data.json';
import { FiX } from 'react-icons/fi';
import Category from './Category';
import api from '../../api/ApiController';
import { useTodoApi } from '../../context/TodoApiContext';
import { useQuery } from 'react-query';
import userStore from '../../store/userStore';

const TodoList = ({ filter, filterId }: any) => {
  const [list, setList] = useState(data);
  const { userInfo } = userStore();
  const { todos } = useTodoApi();
  //투두 리스트 조회
  const { data: todolist } = useQuery(['todolist'], async () => {
    return api
      .post('/api/v1/category/categoryInfo', {
        oauthId: userInfo.userOauthId,
      })
      .then((res) => res.data.map((item: any) => item.todoList));
    // .then((res) => console.log(res))
  });
  const [addOpen, setAddOpen] = useState(false);
  //투두 생성
  const handleAdd = async (todo: any) => {
    const res = await api.post('/api/v1/todo/create', todo);
    console.log(res);
  };
  //투두 수정
  const handleModify = (modified: any) => {
    setList(list.map((t) => (t.id === modified.id ? modified : t)));
  };
  //투두 삭제
  const handleDelete = (deleted: any) => {
    setList(list.filter((t) => t.id !== deleted.id));
  };
  const filtered = list.filter((item: any) => item.category === filter);

  // const filtered = todolist.filter((item: any) => item.categoryName === filter);
  // console.log(filtered);
  // console.log(todolist);

  return (
    <Section>
      <Category filter={filter} filterId={filterId}></Category>
      <ul>
        {filtered.map((item: any) => (
          <Todo
            key={item.id}
            todo={item}
            onModify={handleModify}
            onDelete={handleDelete}
          />
        ))}
      </ul>

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
