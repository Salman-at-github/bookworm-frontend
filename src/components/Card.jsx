import React from 'react';
import { AiOutlineBook } from 'react-icons/ai';

const Card = ({ author, title, genre }) => {
  return (
    <div className='z-10 p-4 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 shadow-md transition-transform transform hover:scale-105'>
      <div className='relative mb-4'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-800 opacity-50 rounded-md'></div>
        <div className='w-12 h-16 bg-yellow-400 rounded-md flex items-center justify-center'>
          <AiOutlineBook className='text-4xl text-gray-800' />
        </div>
        <h1 className='text-xl font-semibold ml-4 text-white absolute bottom-4 left-4'>{title}</h1>
      </div>
      <h3 className='text-gray-800 text-base font-medium'>{author}</h3>
      <h3 className='text-gray-950 text-base font-normal px-2 p-1 bg-teal-300 w-fit mt-2 rounded-md'>{genre}</h3>
    </div>
  );
};

export default Card;
