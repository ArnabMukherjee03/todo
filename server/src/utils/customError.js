const Boom = require("@hapi/boom");


const error = (data,message="Somethind Went Wrong",statuscode = "500") =>{
  console.log(data,message);
 Boom.badData(message,data);}

 module.exports = error;