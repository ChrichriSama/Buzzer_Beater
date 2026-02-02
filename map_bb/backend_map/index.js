// Imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const pinRoute = require("./routes/pins")

// App initialization
const app = express();

dotenv.config();
app.use(express.json())

//using dotenv for security reasons () hide the database connection string)
mongoose.connect(process.env.Mongo_Url)

.then(() => {
   console.log("MongoDB connected!")
})
.catch((err) => console.error("Error with MongoDB connection attempt:", err));

app.use("/api/pins", pinRoute);   

app.listen(3000, ()=>{
    console.log("Backend server is running !")
})

