import { format, isValid } from 'date-fns'

const WorkoutDetail = ({ workout }) => {
  const createdAt = new Date(workout.createdAt)
  const updatedAt = new Date(workout.updatedAt)

  const formatedCreatedAt = isValid(createdAt) ? format(createdAt, 'dd-MM-yyyy HH:mm:ss') : '';
  const formatedUpdatedAt = isValid(updatedAt) ? format(updatedAt, 'dd-MM-yyyy HH:mm:ss') : ''

  return (
    <>
      <div className="bg-blue-100 mx-5 my-5">
        <h3 className="text-3xl font-bold text-blue-400 py-1">{workout.title} </h3>
        <p className="text-base py-1"><strong>Load (kg): </strong>{workout.load}</p>
        <p className="text-base py-1"><strong>Repetitions: </strong>{workout.repetitions}</p>
        <p className="text-base py-1"><strong>Created Date: </strong>{formatedCreatedAt}</p>
        <p className="text-base py-1"><strong>updated Date: </strong>{formatedUpdatedAt}</p>
      </div>
    </>
  )
}

export default WorkoutDetail