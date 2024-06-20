import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className='flex flex-col'>
          <Link to='/'>
            <h1 className='text-2xl font-bold my-10 text-center'>Workout Reminder</h1>
          </Link>

        <nav className='flex'>
          <Link to='/signup1'>
            <h1 className='text-2xl font-bold my-10 text-center'>Sign up</h1>
          </Link>
          <Link to='/login'>
            <h1 className='text-2xl font-bold my-10 text-center'>Log In</h1>
          </Link>
        </nav>

      </div>
    </header>
  )
}

export default Navbar