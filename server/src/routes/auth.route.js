const Joi = require('joi');
const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/auth.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const ApiError = require("../utils/ApiError");

const router = [
  {
    method: "POST",
    path: "/auth/register",
    handler: register,
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required().messages({
            'string.base': 'Email should be a valid email address',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
          }),
          password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/).required().messages({
            'string.base': 'Password should be a string',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required',
          }),
          name: Joi.string().trim().required().messages({
            'string.base': 'Name should be a string',
            'string.empty': 'Name cannot be empty',
            'any.required': 'Name is required',
          }),
        }),
      }
    }
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: login,
  },
  {
    method: "GET",
    path: "/auth/logout",
    handler: logout,
  },
  {
    method: "GET",
    path: "/auth/getuser",
    options: {
      handler: getUser,
      pre: [
        {
          method: verifyJwt,
        },
      ],
    },
  },
];

module.exports = router;
