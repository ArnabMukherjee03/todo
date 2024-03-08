const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/auth.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const Joi = require("joi");
const ApiError = require("../utils/ApiError");

const router = [
  {
    method: "POST",
    path: "/auth/register",
    handler: register,
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
            .required(),
          name: Joi.string().trim().required(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: login,
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
    },
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
