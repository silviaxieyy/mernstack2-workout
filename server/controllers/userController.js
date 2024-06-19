
const user = require('../models/userModel')

const loginUser = async (req, res) => {
  res.json({mssg: 'The user has logged in.'})
}

const signupUser = async (req, res) => {
  res.json({mssg:'The user has signed up.'})
}

module.exports = {
  loginUser,
  signupUser
}

