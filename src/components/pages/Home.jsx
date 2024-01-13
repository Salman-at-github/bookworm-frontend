import React from 'react'
import Books from '../Books'
import PreferredBooks from '../PreferredBooks'

const Home = () => {
  return (
    <div className='min-h-screen px-8 py-10'>
      <PreferredBooks/>
      <Books/>
    </div>
  )
}

export default Home