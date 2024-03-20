const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')
const error = require('../utils/customError')
const response = require('../utils/ApiResponse')
const mailQueue = require('../utils/queue')
const {
  registerTemplate,
  forgotPassEmail,
  updatepass
} = require('../constants/htmlTemplates')

const register = async (req, res) => {
  try {
    const { email, password, name } = await req.payload

    const existedUser = await User.findOne({ where: { email } })
    if (existedUser) {
      throw new ApiError(404, 'User With this Email Already Exist')
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const user = await User.create(
      {
        name,
        email,
        password: hashedPass
      },
      { returning: true }
    )

    const userEmail = user.dataValues.email
    const subject = 'Welcome to TodoApp - Registration Successful!'
    const html = registerTemplate({ name: user.dataValues.name })

    await mailQueue.add({ email: userEmail, subject, html })

    return response(res, null, 'User Created Successfully', 201)
  } catch (err) {
    throw error({ message: err.message, status: 'failure' }, err.message)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = await req.payload

    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      throw new ApiError(404, 'User Does Not Exist')
    }

    const isPassValid = await bcrypt.compare(password, user.password)

    if (!isPassValid) {
      throw new ApiError(401, 'Invalid User Credentials')
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '24h'
      }
    )

    const loggedinUser = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ['password'] }
    })

    const options = {
      httpOnly: true,
      secure: true,
      path: '/'
    }

    return response(
      res,
      { user: loggedinUser },
      'User Loggedin Successfully',
      200,
      { accessToken }
    ).state('accessToken', accessToken, options)
  } catch (err) {
    throw error({ message: err.message, status: 'failure' }, err.message)
  }
}

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      path: '/'
    }
    return response(res, null, 'User Log Out Successfully', 200).unstate(
      'accessToken',
      options
    )
  } catch (err) {
    throw error({ message: err.message, status: 'failure' }, err.message)
  }
}

const getUser = async (req, res) => {
  try {
    return response(res, { user: req.user }, 'User Fetched Succesfully', 200)
  } catch (err) {
    throw error({ message: err.message, status: 'failure' }, err.message)
  }
}

// Requesting for Forget Password
const reqForgetPass = async (req, res) => {
  try {
    const { email } = req.payload

    console.log(email)

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })

    if (!user) {
      throw new ApiError(404, 'User not Found')
    }

    const passToken = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '10m'
      }
    )
    const subject = 'Forget Password Link'
    const html = forgotPassEmail({
      name: user.dataValues.name,
      resetLink: `http://localhost:3000/resetpassword/${passToken}`,
      validity: '10 minutes'
    })

    await mailQueue.add({ email: user.dataValues.email, subject, html })

    return response(
      res,
      null,
      'A link send to your email to update your Password',
      200
    )
  } catch (err) {
    throw error({ message: err.message, status: 'failure' }, err.message)
  }
}

const resForgetPass = async (req, res) => {
  try {
    const passToken = req.headers.authorization?.replace('Bearer ', '')
    const { password } = req.payload

    if (!passToken) {
      throw new ApiError(404, 'Unauthorized access')
    }

    const decodedToken = jwt.verify(passToken, process.env.TOKEN_SECRET)

    const user = await User.findOne({ where: { email: decodedToken?.email } })

    const isSamePass = await bcrypt.compare(password, user?.password)

    if (isSamePass) {
      throw new ApiError(404, 'Please use another password')
    }

    const hashedPass = await bcrypt.hash(password, 10)

    await User.update(
      { password: hashedPass },
      { where: { email: decodedToken.email } }
    )

    const subject = 'Password Update Successfully'
    const html = updatepass()

    await mailQueue.add({ email: user.dataValues.email, subject, html })

    return response(res, null, 'Password Update Successfully', 200)
  } catch (err) {
    throw error({ message: err.message, status: 'failure' }, err.message)
  }
}

module.exports = {
  register,
  login,
  logout,
  getUser,
  reqForgetPass,
  resForgetPass
}
