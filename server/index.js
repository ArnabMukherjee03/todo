require('dotenv').config();
const server = require("./src/app");
const {connectDB} = require("./src/db/database")
const path = require('path');

// Database Connection
connectDB();


// IIFE Function for starting the server
(
    async()=>{
        try {
            await server.start();
            console.log(`Server is running at ${server.info.uri}`);
        } catch (error) {
            console.log("Something Went Wrong");
        }
    }
)();

console.log(path.resolve('./src', 'models'));


