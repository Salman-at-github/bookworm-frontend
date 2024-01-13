import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';

const PreferredBooks = () => {
  const [books, setBooks] = useState([]);
  const navigateTo = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigateTo("/login")
    }
    const fetchPreferredBooks = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const response = await fetch('http://127.0.0.1:5000/api/books/preferences', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setBooks(data);
        } else if (response.status === 404) {
          // Handle case when no preferred books are found
          console.log('No preferred books found');
        } else {
          console.error('Failed to fetch preferred books');
        }
      } catch (error) {
        console.error('An unexpected error occurred', error);
      }
    };

    fetchPreferredBooks();
  }, []);

  return (
    <div className='border-b border-black pb-10'>
      <h2 className="text-2xl font-bold mb-4">Books As Per Your Preference</h2>
      {books.length === 0 ? (
        <p>No preferred books found. Please update your preference <Link className='text-blue-400 underline' to='/preferences'>here</Link></p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <li key={index} className='border-2 rounded-lg border-white'>
              <Card title={book.title} author={book.author} genre={book.genre}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreferredBooks;
