import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }


  return (
    <header className='flex justify-between items-center'>
      <div className='flex-1'>
        <Link to='/'>
          <h1 className='text-3xl font-bold my-10 text-center'>Workout Reminder</h1>
        </Link>
      </div>

      <div className='mx-auto flex w-1/5'>
        <nav className='flex flex-row space-x-4'>
          <button onClick={handleClick}>Log out</button>
          <Link to='/signup1'>
            <h1 className='text-xl text-nowrap my-10'>Sign up</h1>
          </Link>
          <Link to='/login'>
            <h1 className='text-xl text-nowrap my-10'>Log in</h1>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar