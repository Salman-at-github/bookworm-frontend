import React, { useState, useEffect } from 'react';

const PreferencesSelection = ({ onSavePreferences }) => {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/fields');
        if (response.status === 200) {
          const data = await response.json();
          setAuthors(data.authors);
          setGenres(data.genres);
        }
      } catch (error) {
        console.error('Failed to fetch fields', error);
      }
    };

    const fetchUserPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:5000/api/user/getpreferences', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setSelectedAuthors(data.preferredAuthors || []);
          setSelectedGenres(data.preferredGenres || []);
        }
      } catch (error) {
        console.error('Failed to fetch user preferences', error);
      }
    };

    fetchFields();
    fetchUserPreferences();
  }, []);

  const handleSavePreferences = () => {
    onSavePreferences({
      preferred_authors: selectedAuthors.join(","),
      preferred_genres: selectedGenres.join(","),
    });
  };

  const handleRemoveAuthor = (author) => {
    const updatedAuthors = selectedAuthors.filter((selectedAuthor) => selectedAuthor !== author);
    setSelectedAuthors(updatedAuthors);
  };

  const handleRemoveGenre = (genre) => {
    const updatedGenres = selectedGenres.filter((selectedGenre) => selectedGenre !== genre);
    setSelectedGenres(updatedGenres);
  };

  return (
    <div className='text-center flex justify-center items-center flex-col gap-4'>
      <h2 className='my-8 text-xl font-bold'>Select Preferences</h2>
      <div>
        <label htmlFor="preferredAuthors" className='text-base font-bold'>Preferred Authors:</label>
        <div className="flex items-center justify-center flex-col mt-4">
          <select className='border-2 rounded-md mb-2'
            id="preferredAuthors"
            value={selectedAuthors[selectedAuthors.length - 1] || ''}
            onChange={(e) => setSelectedAuthors([...selectedAuthors, e.target.value])}
          >
            <option value="">Select Author</option>
            {authors
              .filter((author) => !selectedAuthors.includes(author))
              .map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
          </select>
          <div className='flex justify-center items-center py-3 bg-gray-100 gap-2 flex-wrap md:px-8 rounded-md mb-8'>
            {selectedAuthors.map((author, index) => (
              <div key={index} className="selected-option bg-teal-400 px-2 py-1 mt-2 rounded-md flex justify-normal items-center">
                <span className='text-white'>{author}</span>
                <span onClick={() => handleRemoveAuthor(author)} className="pl-2 font-bold text-white cursor-pointer">
                  x
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="preferredGenres" className='text-base font-bold'>Preferred Genres:</label>
        <div className="flex items-center justify-center flex-col mt-4">
          <select
          className='border-2 rounded-md mb-2'
            id="preferredGenres"
            value={selectedGenres[selectedGenres.length - 1] || ''}
            onChange={(e) => setSelectedGenres([...selectedGenres, e.target.value])}
          >
            <option value="">Select Genre</option>
            {genres
              .filter((genre) => !selectedGenres.includes(genre))
              .map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
          </select>
          <div className='flex justify-center items-center py-3 bg-gray-100 gap-2 flex-wrap md:px-8 rounded-md mb-8'>
            {selectedGenres.map((genre, index) => (
              <div key={index} className="selected-option bg-teal-400 px-2 py-1 mt-2 rounded-md flex justify-normal items-center">
                <span className='text-white'>{genre}</span>
                <span onClick={() => handleRemoveGenre(genre)} className="pl-2 font-bold text-white cursor-pointer">
                  x
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className='bg-teal-300 px-3 py-2 rounded-md font-semibold hover:bg-teal-600 hover:text-white' onClick={handleSavePreferences}>Save Preferences</button>
    </div>
  );
};

export default PreferencesSelection;
