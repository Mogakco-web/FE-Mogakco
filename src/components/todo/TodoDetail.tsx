import React from 'react';
import modalStore from '../../store/modalStore';

const TodoDetail = () => {
  const { setModalOpen } = modalStore();
  return (
    <>
      <div className='w-screen h-screen absolute z-5 bg-zinc-700 bg-opacity-20 flex justify-center items-center'>
        <div className='bg-white w-50 h-10'>
          모달입니다만..?
          <button onClick={() => setModalOpen()}>닫기</button>
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
