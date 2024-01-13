import React, { useEffect, useState } from 'react';
import Card from './Card';

const Books = () => {
    const [books, setBooks] = useState(null)
    useEffect(()=>{
        const fetchAllBooks = async()=>{
            try {
                
                const response = await fetch('http://127.0.0.1:5000/api/books')
                if(response.status === 200){
                  const data = await response.json()
                  setBooks(data)
                  console.log(data)
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchAllBooks()
    },[])
  if(!books){
    return(
      <div className='min-h-[500px] flex justify-center items-center'>
        <h1>Loading..</h1>
      </div>
    )
  }
  return (
    <div className=''>
      <h2 className='text-2xl font-bold my-8'>All Books</h2>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {books?.map((book, index) => (
          <li key={index}>
            <Card title={book.title} author={book.author} genre={book.genre}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
