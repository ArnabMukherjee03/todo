const response = (res, data = {}, message, statuscode, additional) => {
  const response = {
    status: 'Success',
    data: {
      ...data,
      ...additional
    },
    message
  }
  return res.response(response).code(statuscode)
}

module.exports = response
