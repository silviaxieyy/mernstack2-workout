import { format, isValid } from 'date-fns'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const WorkoutDetail = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const createdAt = new Date(workout.createdAt)
  const updatedAt = new Date(workout.updatedAt)

  const formatedCreatedAt = isValid(createdAt) ? format(createdAt, 'dd-MM-yyyy HH:mm:ss') : '';
  const formatedUpdatedAt = isValid(updatedAt) ? format(updatedAt, 'dd-MM-yyyy HH:mm:ss') : ''

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
      'Authorization': `Bearer ${user.token}`
      }

    })
    const deletedWorkout = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: deletedWorkout})
    }
  }

  return (
    <>
      <div className="bg-blue-100 mx-5 my-5">
        <div className='flex justify-between items-center'>
          <h3 className="text-3xl font-bold text-blue-400 py-1">{workout.title} </h3>
          <button 
            onClick={handleClick}
            className='m-4'
          >
            <span class="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
        <p className="text-base py-1"><strong>Load (kg): </strong>{workout.load}</p>
        <p className="text-base py-1"><strong>Repetitions: </strong>{workout.repetitions}</p>
        <p className="text-base py-1"><strong>Created Date: </strong>{formatedCreatedAt}</p>
        <p className="text-base py-1"><strong>updated Date: </strong>{formatedUpdatedAt}</p>
        

      </div>
    </>
  )
}

export default WorkoutDetail