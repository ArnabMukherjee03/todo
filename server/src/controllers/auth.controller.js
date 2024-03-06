const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError")

const register = async (req, res) => {
  try {
    const { email, password, name } = await req.payload;

    if (
      [email, name, password].some((field) => field?.trim() === "")
    ) {
      throw new Error("All Fields Are Required");
    }

    const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!regex_pass.test(password)) {
      throw new ApiError(404,"Please use a Strong Password");
    }

    await User.sync({ alter: true })

    const existedUser = await User.findOne({ where: {email: email}});

    if(existedUser){
         throw new ApiError(404,"User With this Email Already Exist");
    }


    const hashedPass = await bcrypt.hash(password,10);


    const user = await User.create({
        name: name,
        email: email,
        password: hashedPass
    })

    console.log(user);

    return res.response({
        status: "Success",
        message: "User Created Successfully"
    }).code(201);

  } catch (err) {
    console.log(err);
    const error = {
        statusCode : err.statusCode,
        status: "failed",
        message: err.message
    }
    return res.response(error).code(err.statusCode);
  }
};

const login = async (req, res) => {
    try {
      const { email, password} = await req.payload;
  
      if (
        [email,password].some((field) => field?.trim() === "")
      ) {
        throw new ApiError(400,"Email and Password Required");
      }

      const user = await User.findOne({
         where: {email: email}
      })

      if(!user){
         throw new ApiError(404, "User Does Not Exist");
      }


      const isPassValid = await bcrypt.compare(password,user.password);
  
      if(!isPassValid){
         throw new ApiError(401,"Invalid User Credentials");
      }

    
      const accessToken = jwt.sign({
          _id: user.id,
          email: user.email,
          name: user.name
      },process.env.TOKEN_SECRET,{
        expiresIn: '24h'
      })


      const loggedinUser =  await User.findOne({
        where: {id: user.id},
        attributes: {exclude: ['password']}
     })

     const options = {
        httpOnly: true,
        secure: true
     }
  
      return res.response({
          status: "Success",
          data: {
            user: loggedinUser,
            accessToken
          },
          message: "User Logged In Successfully"
      }).state("accessToken",accessToken,options).code(200);
  
    } catch (err) {
      console.log(err);
      const error = {
          statusCode : err.statusCode,
          status: "failed",
          message: err.message
      }
      return res.response(error).code(err.statusCode);
    }
  };

  const logout = async (req, res) => {
    try {
      const options = {
        httpOnly: true,
        secure: true
      }
      return res.response({
          status: "Success",
          message: "User Logged Out Successfully"
      }).unstate("accessToken",options).code(201);
  
    } catch (err) {
      console.log(err);
      const error = {
          statusCode : err.statusCode,
          status: "failed",
          message: err.message
      }
      return res.response(error).code(err.statusCode);
    }
  };

  const getUser = async(req,res)=>{
     try {
      return res.response({
        status: "Success",
        data:{
           user: req.user
        },
        message: "User Fetched Successfully"
    }).code(200);
     } catch (err) {
      console.log(err);
      const error = {
          statusCode : err.statusCode,
          status: "failed",
          message: err.message
      }
      return res.response(error).code(err.statusCode);
     }
  }

module.exports = {
    register,
    login,
    logout,
    getUser
}