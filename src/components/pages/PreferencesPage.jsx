import React, { useEffect, useState } from 'react';
import PreferencesSelection from '../PreferencesSelection';
import { useShowToast } from '../../hooks/showToastHook';
import { useNavigate } from 'react-router-dom';

const PreferencesPage = () => {
  const [initialPreferences, setInitialPreferences] = useState({
    preferredAuthors: [],
    preferredGenres: [],
  });
  const navigateTo = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigateTo("/login")
        
    }
  })
  const showToast = useShowToast();

  const handleSavePreferences = async (preferences) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(preferences),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        showToast('success', responseData.message);

      } else {
        // Handle errors
        console.error('Failed to save preferences');
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
  };

  return (
    <div className='min-h-screen'>
      <PreferencesSelection onSavePreferences={handleSavePreferences} initialPreferences={initialPreferences} />
    </div>
  );
};

export default PreferencesPage;
