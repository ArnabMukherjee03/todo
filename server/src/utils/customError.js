const Boom = require('@hapi/boom')

const error = (data, message = 'Somethind Went Wrong', statuscode = '500') => {
  return Boom.badData(message, data)
}

module.exports = error
