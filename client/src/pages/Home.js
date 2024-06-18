import { useEffect } from 'react'
import WorkoutDetail from '../components/WorkoutDetail'
import WorkoutForm from '../components/WorkoutForm'
import { UseWorkoutsContext } from '../hooks/useWorkoutsContext'


const Home = () => {
  const {workouts, dispatch} = UseWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const workoutData = await response.json()
      
      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: workoutData})
      }
    }
    fetchWorkouts()
  },[])

  return (
    <div className="flex flex-wrap">
      <div className='flex flex-col w-2/3'>
        {workouts && workouts.map((workout) => (
          <WorkoutDetail key={workout._id} workout={workout} />
        ))}
      </div>
      <div className='flex flex-col w-1/3'>
        <WorkoutForm />
      </div>
    </div>
  )
}

export default Home