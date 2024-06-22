import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext()
  const [authError, setAuthError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    if (!user) {
      setAuthError('You must be logged in to create a workout.')
      return 
    }

    setAuthError('')

    try {
      const response = await fetch('/api/workouts', {
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`

        }
      })
      const newWorkout = await response.json()
      
      if (response.ok) {
        reset();
        dispatch({type: 'CREATE_WORKOUT', payload: newWorkout})
      }
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-bold my-3'>Create workout</h1>
        <div className='flex flex-col'>
          <label>Excersize Title:</label>
          <input 
            type='text'
            className='w-64 min-h-8 text-xl text-center bg-blue-200' 
            {...register('title', {required: true})}
          />
          {errors.title && <span className='text-red-500'>Title is required.</span>}
        </div>
        <div className='flex flex-col'>
          <label>Load (in KG):</label>
          <input 
            type='number'
            className='w-64 min-h-8 text-xl text-center bg-blue-200' 
            {...register('load', {required: true})}
          />
          {errors.load && <span className='text-red-500'>This field is required.</span>}
        </div>
        <div className='flex flex-col'>
          <label>Repetitions:</label>
          <input 
            type='number'
            className='w-64 min-h-8 text-xl text-center bg-blue-200' 
            {...register('repetitions', {required: true})}
          />
          {errors.repetitions && <span className='text-red-500'>This field is required.</span>}
        </div>
        <div className='flex justify-center'>
          <button 
            className='bg-sky-300 hover:bg-blue-500 rounded-md px-4 py-1 my-2'
          >
            Create
          </button>
          {authError && <span className='text-red-500'>{authError}</span>}
        </div>
      </div>


    </form>
  )
}

export default WorkoutForm