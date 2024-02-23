const User = require("../models/userSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtVerify = require('../middlewares/authMiddleware')
const saltRounds = 10;


const registerAccount = async (req, res, next) => {
    try {
        const { name, email, password} = req.body
        if(!name || !email || !password ){
            return res.status(400).json({message: "Bad request"})
        }
        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({ message: "User already exists", status: "ERROR" });
        }
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser =  await User.create({
                name: name,
                email: email,
                password: hash,
            })
            const jwtToken = await jwt.sign({userId: newUser._id}, process.env.TOKEN_SECRET)
            return res.json({message: "User created successfully", token : jwtToken, name: newUser?.name, status: "SUCCESS"})
        
        
    } catch (error) {
        console.error("Error occurred in register: ", error);
        return res.status(500).json({ message: "Internal Server Error", status: "ERROR" });
        
    }
}






module.exports = { registerAccount }