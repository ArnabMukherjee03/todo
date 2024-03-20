// queue.js
const Queue = require('bull')
const { sendMail } = require('./mailService')
const error = require('./customError')

const REDIS_URL = process.env.REDIS_URL

const mailQueue = new Queue('mail', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
})

console.log(REDIS_URL)

mailQueue.process(async (job) => {
  try {
    const { email, subject, html } = job.data
    await sendMail({ email, subject, html })
  } catch (err) {
    throw error({ message: err.message, status: 'failure' }, err.message)
  }
})

module.exports = mailQueue
