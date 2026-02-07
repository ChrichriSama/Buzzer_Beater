// Imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")

// App initialization
const app = express();

const userRoute = require("./routes/users")
const pinRoute = require("./routes/pins")



dotenv.config();

//middleware, logiciel qui permet un ou plusieurs types de communication ou de connectivité entre des applications ou composants
app.use(express.json());

//using dotenv for security reasons (hide the database connection string)
mongoose.connect(process.env.Mongo_Url)

.then(() => {
   console.log("MongoDB connected!")
})
.catch((err) => console.error("Error with MongoDB connection attempt:", err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(3000, ()=>{
    console.log("Backend server is running !")
})
