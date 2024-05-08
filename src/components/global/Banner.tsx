import React from 'react';
import '@/c/global/ticker.css';
import Ticker from './Ticker';

const Banner = () => {
  return (
    <div className='my-3 flex flex-col justify-between px-10 pb-4 lg:flex-row '>
      <div className='mb-2 flex w-full flex-col justify-end lg:w-1/4'>
        <h1 className='text-3xl font-bold text-untele'>UnTelevised Headlines</h1>
        <h2 className='mt-5 md:mt-0'>
          The Revolution will be{' '}
          <span className='font-semibold underline decoration-untele decoration-2'>
            UnTelevised
          </span>
        </h2>
      </div>
      <div className='flex flex-col items-end justify-between lg:w-4/5'>
        {/* <p className='mt-5 max-w-md text-untele md:mt-2 lg:max-w-lg hidden lg:flex'>
          The latest breaking news you wont see on mainstream media
        </p> */}
        <Ticker />
      </div>
    </div>
  );
};

export default Banner;
