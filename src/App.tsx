import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [Show, setShow] = useState(false);
  const [isMoon, setIsMoon] = useState(true);
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>(() => {
    const storedTodo = localStorage.getItem('todo');
    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  const [changeImg, setChangeImg] = useState(true);
  const [changeImg2, setChangeImg2] = useState(false);
  const [active, SetActive] = useState('')

  const click = (clicknum: 'all' | 'active' | 'completed') => {
    SetActive(clicknum);
  };

  const toggle = () => {
    setShow(!Show);
    setIsMoon(!isMoon);
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('gio');
  };
  const toggle2 = () => {
    setChangeImg(!changeImg);
    setChangeImg2(!changeImg2);
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

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);

  return (
    <>
      <header>
        <div className='flex justify-center flex-col items-center z-10'>
          {Show && (
            <img
              className='absolute left-1/2 transform -translate-x-1/2 -z-20 md:hidden'
              src='/assets/MobileLight.svg'
              alt='MobileLight'
              />
              )}
              {Show && <img className='hidden md:flex absolute left-1/2 transform -translate-x-1/2 -z-20' src="/assets/DesktopLight.svg" alt="" />}
          {isMoon && (
            <img
              className='absolute left-1/2 transform -translate-x-1/2 -z-20 md:hidden'
              src='/assets/MobileDark.svg'
              alt='MobileDark'
            />
          )}
          {isMoon && <img className='hidden md:flex absolute left-1/2 transform -translate-x-1/2 -z-20' src="/assets/DesktopDark.svg" alt="" />}
          <div className='flex items-center gap-[210px]  mt-[30px] md:gap-[300px] xl:gap-[370px]'>
            <h1 className='text-white text-[30px] font-normal md:text-[40px] xl:text-[50px]'>TODO</h1>
            {isMoon && (
              <img
                className='cursor-pointer md:w-[30px] xl:w-[35px]'
                onClick={toggle}
                src='/assets/Combined Shape (8).svg'
                alt='Sun'
              />
            )}
            {Show && (
              <img
                onClick={toggle}
                className='cursor-pointer md:w-[30px] xl:w-[35px]'
                src='/assets/Moon.svg'
                alt='Moon'
              />
            )}
          </div>
          <form onSubmit={createTodo}>
            <div className='flex items-center justify-center  mt-[60px] w-[327px] bg-white pl-5 gap-3 rounded-[5px] text-[#9495A5] relative bottom-[20px] dark:bg-[#25273D] md:w-[440px] md:h-[54px] xl:w-[540px] xl:h-[64px]'>
              {changeImg && <div onClick={toggle2} className='border cursor-pointer pl-[15px] md:w-[25px] md:h-[25px] xl:w-[30px] xl:h-[30px]'></div>}
              {changeImg2 && <div><img onClick={toggle2} className='w-[22px] cursor-pointer md:w-[22px] xl:w-[32px]' src="/assets/Group 4 (8).svg" alt="" /></div>}
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className='w-[100%] h-[48px]  border-[none] outline-none rounded-[5px] text-[12px] font-normal break-words dark:bg-[#25273D] dark:placeholder:text-[#767992] md:text-[16px] xl:text-[18px]'
                type='text'
                placeholder='Create a new todo…'
              />
            </div>
          </form>
        </div>
      </header>
      <main className='flex flex-col items-center dark:bg-[#25273D] w-[327px] m-[auto] rounded-[5px] md:w-[440px] md:h-[54px] xl:w-[540px] xl:h-[64px] '>
        {todo.map((el, index) => (
          <div
            className='flex justify-start w-[327px] items-center m-[auto] md:w-[440px] md:h-[54px] xl:w-[540px] xl:h-[64px]'
            style={{ wordBreak: 'break-word' }}
            key={index}
          >
            <div className='flex items-center justify-between w-[327px] min-h-[48px] bg-white p-5 dark:bg-[#25273D] md:w-[440px] md:h-[54px] xl:w-[540px] xl:h-[64px]  id2'>
              {changeImg&&<div onClick={toggle2} className='border pr-[20px] mr-[20px] cursor-pointer md:w-[25px] md:h-[25px] xl:w-[30px] xl:h-[30px]'></div>}
              {changeImg2 && <div><img onClick={toggle2} className='cursor-pointer md:w-[22px] xl:w-[32px]' src="/assets/Group 4 (8).svg" alt="" /></div>}
              <h3 className='text-[12px] font-bold md:text-[16px] xl:text-[18px] dark:text-[#767992]' style={{textDecoration: changeImg2 ? 'line-through': ''}}>{el}</h3>
              <img
                onClick={() => handleRemove(index)}
                className='ml-[20px] cursor-pointer md:w-[20px] xl:w-[25px]'
                src='/assets/Combined Shape 2 (3).svg'
                alt='X'
              />
            </div>
          </div>
        ))}
        <div className='w-[327px] h-[48px] bg-white flex justify-between items-center margin-[auto] p-5 dark:bg-[#25273D] dark:text-[#5B5E7E] md:w-[440px] md:h-[54px] xl:w-[540px] xl:h-[64px]  id xl:hidden'>
          <h1>{remainingItems} items left</h1>
          <h1>Clear Completed</h1>
        </div>
      <section className='flex  justify-center'>
        <div className='w-[327px] h-[48px] bg-white flex justify-evenly items-center margin-[auto]  p-5 dark:bg-[#25273D] dark:text-[#5B5E7E] mt-[30px] rounded-[5px] md:w-[440px] md:h-[54px] xl:w-[540px] xl:h-[64px] xl:relative xl:top-[50px]'>
        <h1 className='hidden xl:flex'>{remainingItems} items left</h1>
        <h1 onClick={() => click('all')} style={{ color: active === 'all' ? 'blue' : '' }} className='cursor-pointer'>All</h1>
        <h1 onClick={() => click('active')} style={{ color: active === 'active' ? 'blue' : '' }} className='cursor-pointer'>Active</h1>
        <h1 onClick={() => click('completed')} style={{ color: active === 'completed' ? 'blue' : '' }} className='cursor-pointer'>Completed</h1>
          <h1 className='hidden xl:flex'>Clear Completed</h1>
        </div>
      </section>
      <footer className='flex justify-center mt-[40px] text-[#9495A5] dark:text-[#5B5E7E] xl:relative xl:mt-[150px]'>Drag and drop to reorder list</footer>
      </main>

    </>
  );
}

export default App;
