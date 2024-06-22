const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutControllers')

const router = express.Router()

//require auth for all workout routes first.
router.use(requireAuth)

//GET all the workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router