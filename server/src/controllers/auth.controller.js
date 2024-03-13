const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const error = require("../utils/customError");
const response = require("../utils/ApiResponse");
const { sendMail } = require("../utils/mailService");

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
    }, { returning: true });

  

    const userEmail = user.dataValues.email;
    const subject = "Welcome to TodoApp - Registration Successful!";
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Successful</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
    
    <div class="max-w-screen-md mx-auto p-6 bg-white rounded shadow-md">
        <h1 class="text-2xl text-center font-bold mb-4">Registration Successful!</h1>
        <p class="text-center text-gray-700 mb-4">Dear ${user.dataValues.name},</p>
        <p class="text-center text-gray-700 mb-4">Your registration has been successfully completed. You are now a member of our community. Thank you for joining!</p>
        <p class="text-center text-gray-700 mb-4">If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@example.com" class="text-blue-500">support@example.com</a>.</p>
        <p class="text-center text-gray-700">Best regards,<br> The Example Team</p>
    </div>
    
    </body>
    </html>
    `

    
    await sendMail({email:userEmail,subject,html});

    return response(res, null, "User Created Successfully", 201);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
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
      path: "/",
    };

    return response(
      res,
      { user: loggedinUser },
      "User Loggedin Successfully",
      200,
      { accessToken: accessToken }
    ).state("accessToken", accessToken, options);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      path: "/",
    };
    return response(res, null, "User Log Out Successfully", 200)
      .unstate("accessToken", options)
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const getUser = async (req, res) => {
  try {
    return response(
      res,
      { user: req.user },
      "User Fetched Succesfully",
      200
    );
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
};
