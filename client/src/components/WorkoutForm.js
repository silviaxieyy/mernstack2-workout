import { useForm } from 'react-hook-form'
import { UseWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { dispatch } = UseWorkoutsContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/workouts', {
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          'content-Type': 'application/json'
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
            className='bg-blue-400 hover:bg-blue-400 rounded-md p-1 my-2'
          >
            Create
          </button>
        </div>
      </div>


    </form>
  )
}

export default WorkoutForm