const { User } = require("../models/UserModle");
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')

const secret="test"

exports.createUser=async(req,res)=>{
    try {
        const {email,password}= req.body
        if(!email || !password){
            return res.status(400).json({message:"Email and password is required"})
        }
        const hashedPassword= await bcrypt.hash(password,10)
        const result=await User.create({
            email,
            password:hashedPassword
        })

        const token= jwt.sign({email:result.email, id:result.id}, secret,{
            expiresIn:"72h"
        })
        res.status(201).json({result,token})
        
    } catch (error) {
        if (error.code === 11000) { // Check for duplicate key error
            return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(400).json(error);
        
    }
}

exports.loginUser=async(req,res)=>{
    const {email,password}= req.body

    try {
        const oldUser= await User.findOne({email})
        if (!oldUser) {
            res.status(404).json({ message: "User doesn't exist" });
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        
            if (!isPasswordCorrect) {
                res.status(404).json({ message: "Invalid credentials" });
            } else {
                const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
                    expiresIn: "72h"
                });
                res.status(200).json({ result: oldUser, token });
            }
        }
        
        
    } catch (error) {
        res.status(404).json(error);
        
    }
}

exports.fetchUserById=async(req,res)=>{
    const {id}= req.params;
    try {
        const user= await User.findById(id).exec()
        res.status(200).json(user)
        
    } catch (error) {
        res.status(400).json(error)
        
    }
}