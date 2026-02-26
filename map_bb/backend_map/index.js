// Imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

// App initialization
const app = express();

const userRoute  = require("./routes/users");
const pinRoute   = require("./routes/pins");
const forumRoute = require("./routes/forum");

//Allowing the front end to access the backend (CORS)
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
    origin: function(origin, callback) {
        // !origin     = requêtes sans origin (Postman, etc.)
        // origin=null = pages ouvertes en file:// dans le navigateur
        if (!origin || origin === 'null' || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

dotenv.config();

//middleware
app.use(express.json());

// Servir les pages HTML statiques du site depuis localhost:3000
app.use(express.static(path.join(__dirname, '../../')));

//using dotenv for security reasons (hide the database connection string)
mongoose.connect(process.env.Mongo_Url)
.then(() => {
   console.log("MongoDB connected!")
})
.catch((err) => console.error("Error with MongoDB connection attempt:", err));

app.use("/api/pins",  pinRoute);
app.use("/api/users", userRoute);
app.use("/api/forum", forumRoute);

app.listen(3000, ()=>{
    console.log("Backend server is running !")
})
