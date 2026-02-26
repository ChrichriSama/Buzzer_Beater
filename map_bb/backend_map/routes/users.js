const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Register

router.post("/register", async (req,res)=>{

    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and send a response
        const user = await newUser.save();
        res.status(200).json(user._id);

    }catch(err){
        res.status(500).json(err);
        console.error("Error during user registration:", err);
    }
});

//Login
router.post("/login", async (req, res)=>{
    try{
        //find User
        const user = await User.findOne({username:req.body.username});
        if (!user) return res.status(400).json("Wrong username/Password");

        //check password
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if (!validPassword) return res.status(400).json("Wrong username/Password");

        //send res
        res.status(200).json({_id:user._id, username:user.username});
    }catch(err){
        res.status(500).json(err);
        console.error("Error with login: ", err);
    }
})

module.exports = router
