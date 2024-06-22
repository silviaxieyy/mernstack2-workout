import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
/*   console.log(user?.email) */

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

      <div className='flex flex-row mx-2 flex'>
        <nav className='flex flex-row flex-nowrap space-x-4'>
        {user && (
          <div className='flex flex-row justify-between'>
            <p className='text-xl text-nowrap mx-2'>{user.email}</p>
            <button 
              onClick={handleClick}
              className='text-xl text-nowrap px-4 mx-2 bg-green-50 rounded-2xl'
            >
              Log out
            </button>
          </div>
        )}
        {!user && (
          <div className='flex flex-row'>
            <Link to='/signup'>
              <h1 className='text-xl text-nowrap px-4 mx-2 bg-blue-100 rounded-2xl'>Sign up</h1>
            </Link>
            <Link to='/login'>
              <h1 className='text-xl text-nowrap px-4 mx-2 bg-blue-100 rounded-2xl'>Log in</h1>
            </Link>
          </div>
        )}



        </nav>
      </div>
    </header>
  )
}

export default Navbar