// Imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")

// App initialization
const app = express();

dotenv.config();


//using dotenv for security reasons () hide the database connection string)
mongoose.connect(process.env.Mongo_Url)
.then(() => {
   console.log("MongoDB connected!")
})
.catch((err) => console.error("Error with MongoDB connection attempt:", err));

app.listen(3000, ()=>{
    console.log("Backend server is running !")
})