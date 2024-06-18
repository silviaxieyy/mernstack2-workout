import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1 className='text-2xl font-bold my-10 text-center'>Workout Reminder</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar