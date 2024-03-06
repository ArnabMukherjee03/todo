const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

exports.verifyJwt = async (req,res)=>{
      
        const {accessToken} = await req.state;

        console.log("Token",accessToken);

        if(!accessToken){
            throw new ApiError(401,"Unauthorized Request")
        }

        const decodedToken = jwt.verify(accessToken,process.env.TOKEN_SECRET);

        console.log(decodedToken);

        const user = await User.findOne({
            where: {id: decodedToken._id},
            attributes: {exclude: ['password']}
         })

         if(!user){
            throw new ApiError(401,"Invalid Access Token");
         }

         req.user = user;

        return res.continue;
    
}