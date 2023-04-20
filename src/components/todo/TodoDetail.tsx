import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import tw from 'tailwind-styled-components';
import 'react-quill/dist/quill.snow.css';
import api from '../../api/ApiController';
import userStore from '../../store/userStore';

const TodoDetail = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userInfo } = userStore();
  const {
    state: { data: item },
  } = useLocation();
  const [data, setData] = useState(item);
  const { todoTitle, todoContents, categoryId } = data;
  const [text, setText] = useState(todoContents);
  const [editor, setEditor] = useState(false);
  const [category, setCategory] = useState('');
  const getCategoryInfo = async () => {
    await api
      .get('/api/v1/category', {
        params: { categorySeq: categoryId },
      })
      .then((res) => setCategory(res.data.categoryName));
  };
  const getTodoContents = async () => {
    await api
      .get('/api/v1/todo/tapInfo', { params: { todoSeq: todoId } })
      .then((res) => setData(res.data));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    setEditor(false);
    await api.post('/api/v1/todo/contents', {
      todoSeq: todoId,
      todo_contents: text,
      oauthId: userInfo.userOauthId,
    });
    await queryClient.invalidateQueries(['todolist']);
    await getTodoContents();
  };
  return (
    <>
      <div className='w-screen h-screen absolute z-10 bg-zinc-700 bg-opacity-20 flex justify-center items-center'>
        <div className='bg-white z-10 w-[450px] h-80 rounded-lg p-5'>
          {/* <h1 className='font-bold'>{category}</h1> */}
          <div className='flex justify-between'>
            <h2 className='font-bold text-xl'>🚀 {todoTitle}</h2>
            <XButton
              onClick={() => {
                navigate(-1);
              }}>
              닫기
            </XButton>
          </div>

          <p className='font-bold text-sm m-2'>memo</p>
          {editor ? (
            <form onSubmit={handleSubmit}>
              <ReactQuill
                onChange={setText}
                value={text}
                defaultValue={todoContents}
                className='h-40'
              />
              <Button>저장</Button>
            </form>
          ) : (
            <div className='flex flex-col'>
              <div
                dangerouslySetInnerHTML={{ __html: todoContents }}
                className=' rounded-md h-40 p-3 m-2 border border-slate-300'
              />
              <Button onClick={() => setEditor(true)}>
                {todoContents === null ? '추가' : '수정'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoDetail;

const Button = tw.button`
flex
text-sm
font-bold
text-white
opacity-90
bg-dullPurple
w-fit
rounded-sm
m-2
ml-auto
p-1
`;

const XButton = tw.button`
flex
text-sm
font-bold
text-white
bg-gray-400
w-fit
rounded-sm
p-1
`;
