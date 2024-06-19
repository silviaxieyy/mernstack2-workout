const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true})

//static signup method
userSchema.statics.signup = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw Error('Both Email and Password fields are required.')
  }

  if (!validator.isEmail(email)) {
    throw Error('Please use the right Email Address.')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(`The password is not strong enough.
      A strong password typically includes:
        --At least 8 characters.
        --At least one lowercase letter.
        --At least one uppercase letter.
        --At least one number.
        --At least one special character.`)
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use.')
  }

  const salt = await bcrypt.genSalt(8)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password: hash})

  return user
}

//static login method
userSchema.statics.login = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw Error('Both Email and Password fields are required.')
  }
  
  const user = await this.findOne({email}) 

  if (!user) {
    throw Error('Incorrect email.')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password.')
  }

  return user
}

module.exports = mongoose.model('User', userSchema )