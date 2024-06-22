const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//GET all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id }).sort({createdAt: -1})
  res.status(200).json(workouts)
}

//GET a single workout
const getWorkout = async (req, res) => {
  const {id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout.'})
  }

  const workout = await Workout.findById(id)
  if (!workout) {
    return res.status(404).json({error: "No such workout."})
  }

  res.status(200).json(workout)
}

//POST a new workout
const createWorkout = async (req, res) => {
  const {title, repetitions, load} = req.body

  try {
    const user_id = req.user._id
    const workout = await Workout.create({title, repetitions, load, user_id})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//DELETE a workout
const deleteWorkout = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout.'})
  }
  
    const workout = await Workout.findOneAndDelete({_id: id})
    
    if (!workout) {
      return res.status(404).json({error: 'No such error.'})
    }
    
    res.status(200).json(workout)
}

//UPDATE a workout
const updateWorkout = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status.json({error: 'No such workout.'})
  }

  const workout = await Workout.findOneAndUpdate(
    {_id: id}, 
    {...req.body},
    {new: true}
)

  if (!workout) {
    return res.status.json({error: 'No such workout.'})
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}


