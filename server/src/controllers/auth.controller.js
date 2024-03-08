const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const error = require("../utils/customError");

const register = async (req, res) => {
  try {
    const { email, password, name } = await req.payload;
    const existedUser = await User.findOne({ where: { email: email } });
    if (existedUser) {
      throw new ApiError(404, "User With this Email Already Exist");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPass,
    });

   

    return res
      .response({
        status: "Success",
        message: "User Created Successfully",
      })
      .code(201);
  } catch (err) {
    throw error({ message: err.message,status: "failure"}, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = await req.payload;


    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new ApiError(404, "User Does Not Exist");
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      throw new ApiError(401, "Invalid User Credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const loggedinUser = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ["password"] },
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .response({
        status: "Success",
        data: {
          user: loggedinUser,
          accessToken,
        },
        message: "User Logged In Successfully",
      })
      .state("accessToken", accessToken, options)
      .code(200);
  } catch (err) {
     throw error({ message: err.message,status: "failure"}, err.message)
  }
};

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .response({
        status: "Success",
        message: "User Logged Out Successfully",
      })
      .unstate("accessToken", options)
      .code(201);
  } catch (err) {
    throw error({ message: err.message,status: "failure"}, err.message)
  }
};

const getUser = async (req, res) => {
  try {
    return res
      .response({
        status: "Success",
        data: {
          user: req.user,
        },
        message: "User Fetched Successfully",
      })
      .code(200);
  } catch (err) {
    throw error({ message: err.message,status: "failure"}, err.message)
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
};
