import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/ApiController';
import userStore from '../../store/userStore';

const TodoDetail = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = userStore();
  const {
    state: { data: item },
  } = useLocation();
  const { todoTitle, todoContents, categoryId } = item;
  const [text, setText] = useState('');
  const postContents = () => {
    api
      .post('/api/v1/todo/contents', {
        todoSeq: todoId,
        todo_contents: text,
        oauthId: userInfo.userOauthId,
      })
      .then((res) => console.log(res.data));
  };
  return (
    <>
      <div className='w-screen h-screen absolute z-10 bg-zinc-700 bg-opacity-20 flex justify-center items-center'>
        <div className='bg-white z-10 w-50'>
          <p>{todoTitle}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim().length === 0) return;
            }}>
            <input
              type='text'
              placeholder={todoContents}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
          <button
            onClick={() => {
              navigate(-1);
            }}>
            닫기
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
