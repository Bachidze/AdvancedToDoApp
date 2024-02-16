import React, { useState } from 'react';
import './App.css';

function App() {
  const [Show, setShow] = useState(false);
  const [isMoon, setIsMoon] = useState(true);
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>([]);
  const [changeImg, setChangeImg] = useState(true);
  const [changeImg2, setChangeImg2] = useState(false);
  

  const toggle = () => {
    setShow(!Show);
    setIsMoon(!isMoon);
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('gio')
  };
  const toggle2 = () => {
    setChangeImg(!changeImg)
    setChangeImg2(!changeImg2)
  };

  const createTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setTodo([input, ...todo]);
      setInput('');
    }
  };

  const handleRemove = (index: number) => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };

  const remainingItems = todo.filter((item) => item.trim() !== '').length;

  return (
    <>
      <header>
        <div className='flex justify-center flex-col items-center z-10'>
          {Show && (
            <img
              className='absolute left-1/2 transform -translate-x-1/2 -z-20'
              src='/assets/MobileLight.svg'
              alt='MobileLight'
            />
          )}
          {isMoon && (
            <img
              className='absolute left-1/2 transform -translate-x-1/2 -z-20'
              src='/assets/MobileDark.svg'
              alt='MobileLight'
            />
          )}
          <div className='flex items-center gap-[210px] mt-[30px]'>
            <h1 className='text-white text-[30px] font-normal'>TODO</h1>
            {isMoon && (
              <img
                className='cursor-pointer'
                onClick={toggle}
                src='/assets/Combined Shape (8).svg'
                alt='Sun'
              />
            )}
            {Show && (
              <img
                onClick={toggle}
                className='cursor-pointer'
                src='/assets/Moon.svg'
                alt='Moon'
              />
            )}
          </div>
          <form onSubmit={createTodo}>
            <div className='flex items-center justify-center  mt-[60px] w-[327px] bg-white pl-5 gap-3 rounded-[5px] text-[#9495A5] relative bottom-[20px] dark:bg-[#25273D]'>
              {changeImg && <div onClick={toggle2} className='border cursor-pointer pl-[15px]'></div>}
              {changeImg2 && <div><img onClick={toggle2} className='w-[22px]' src="/assets/Group 4 (8).svg" alt="" /></div>}
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className='w-[100%] h-[48px]  border-[none] outline-none rounded-[5px] text-[12px] font-normal break-words dark:bg-[#25273D] dark:placeholder:text-[#767992]'
                type='text'
                placeholder='Create a new todo…'
              />
            </div>
          </form>
        </div>
      </header>
      <main className='flex flex-col items-center dark:bg-[#25273D] w-[327px] m-[auto] rounded-[5px]'>
        {todo.map((el, index) => (
          <div
            className='flex justify-start w-[327px] items-center m-[auto]'
            style={{ wordBreak: 'break-word' }}
            key={index}
          >
            <div className='flex items-center justify-between w-[327px] min-h-[48px] bg-white p-5 dark:bg-[#25273D] id2'>
              {changeImg&&<div onClick={toggle2} className='border pr-[20px] mr-[20px] cursor-pointer'></div>}
              {changeImg2 && <div><img onClick={toggle2} src="/assets/Group 4 (8).svg" alt="" /></div>}
              <h3 className='text-[12px] font-bold dark:text-[#767992]'>{el}</h3>
              <img
                onClick={() => handleRemove(index)}
                className='ml-[20px] cursor-pointer'
                src='/assets/Combined Shape 2 (3).svg'
                alt='X'
              />
            </div>
          </div>
        ))}
        <div className='w-[327px] h-[48px] bg-white flex justify-between items-center margin-[auto] p-5 dark:bg-[#25273D] dark:text-[#5B5E7E] id'>
          <h1>{remainingItems} items left</h1>
          <h1>Clear Completed</h1>
        </div>
      </main>
      <section className='flex  justify-center'>
        <div className='w-[327px] h-[48px] bg-white flex justify-evenly items-center margin-[auto] p-5 dark:bg-[#25273D] dark:text-[#5B5E7E] mt-[30px] rounded-[5px]'>
          <h1>All</h1>
          <h1>Active</h1>
          <h1>Completed</h1>
        </div>
      </section>

      <footer className='flex justify-center mt-[40px] text-[#9495A5] dark:text-[#5B5E7E]'>Drag and drop to reorder list</footer>
    </>
  );
}

export default App;
