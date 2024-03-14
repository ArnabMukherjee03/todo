const {
  register,
  login,
  logout,
  getUser,
  reqForgetPass,
  resForgetPass,
} = require("../controllers/auth.controller");
const { verifyJwt } = require("../middlewares/auth.middleware");
const Joi = require("joi");
const error = require("../utils/customError");

const registrationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      "any.required": "Password is required.",
    }),
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
});



const router = [
  {
    method: "POST",
    path: "/auth/register",
    handler: register,
    options: {
      validate: {
        payload: registrationSchema,
        failAction: (request, h, err) => {
          const details = err.details;
          console.log(details);
          throw error(
            { message: details[0].message, status: "failure" },
            details[0].message
          );
        },
      },
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: login,
    options: {
      validate: {
        payload: loginSchema,
        failAction: (request, h, err) => {
          const details = err.details;
          console.log(details);
          throw error(
            { message: details[0].message, status: "failure" },
            details[0].message
          );
        },
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
  {
    method: "POST",
    path: "/auth/req/forgetpassword",
    handler: reqForgetPass,
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address.",
            "any.required": "Email is required.",
          })
        }),
        failAction: (request, h, err) => {
          const details = err.details;
          console.log(details);
          throw error(
            { message: details[0].message, status: "failure" },
            details[0].message
          );
        },
      },
    },
  },
  {
    method: "POST",
    path: "/auth/res/forgetpassword",
    handler: resForgetPass,
    options: {
      validate: {
        payload: Joi.object({
          password: Joi.string()
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
          .required()
          .messages({
            "string.pattern.base":
              "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
            "any.required": "Password is required.",
          })
        }),
        failAction: (request, h, err) => {
          const details = err.details;
          console.log(details);
          throw error(
            { message: details[0].message, status: "failure" },
            details[0].message
          );
        },
      },
    },
  }
];

module.exports = router;
