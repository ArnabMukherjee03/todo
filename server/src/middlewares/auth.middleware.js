const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')
const { User } = require('../models')

exports.verifyJwt = async (req, res) => {
  const accessToken =
    req.state?.accessToken || req.headers.authorization?.replace('Bearer ', '')

  if (!accessToken) {
    throw Boom.badRequest('Unauthorized access')
  }

  const decodedToken = jwt.verify(accessToken, process.env.TOKEN_SECRET)

  const user = await User.findOne({
    where: { id: decodedToken.id },
    attributes: { exclude: ['password'] }
  })

  if (!user) {
    throw Boom.badRequest('Invalid Access Token')
  }

  req.user = decodedToken

  return res.continue
}
