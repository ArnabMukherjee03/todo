const ApiError = require('./ApiError')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASS
  }
})

const sendMail = async ({ email, subject, html }) => {
  try {
    console.log(email)
    const info = await transporter.sendMail({
      from: '"Todo App" <Todo-App.com>',
      to: email,
      subject,
      text: '',
      html
    })
    return info
  } catch (error) {
    throw new ApiError(500, error.message)
  }
}

module.exports = {
  sendMail
}
