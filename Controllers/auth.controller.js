import mongoose from "mongoose";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../Config/env.js";
import {sendAccountCreatedEmail} from "../Config/nodemailer.js";

export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();

    if (process.env.NODE_ENV !== "test") {
        session.startTransaction();
    }


    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            const error = new Error("All fields are required");
            error.status = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("Email already exists");
            error.status = 409;
            throw error;
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPWD = await bcrypt.hash(password, salt);

        // create and save user within transaction
        const newUser = new User({ name, email, password: hashedPWD });
        await newUser.save({ session });

        // generate JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        await sendAccountCreatedEmail(newUser.email, newUser.name);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully.. email sent!!",
            data: {
                token,
            },
        });

    } catch (error) {

        if (process.env.NODE_ENV !== "test") {
            await session.abortTransaction();
            await session.endSession();
        }

    }
};

export const signIn=async (req, res,next) => {
    //implement the signIn logic

    try{
        const { email, password } = req.body;

        const user=await User.findOne({
            email,
        });

        if(!user){
            const error=new Error("User not found,email is not recognizable");
            error.statusCode=404;
            throw error;
        }

        const isPwdValid=await bcrypt.compare(password,user.password);

        if(!isPwdValid){
            const error=new Error("Passwords do not match");
            error.statusCode=409;
            throw error;
        }

        const token=jwt.sign({
            userId:user._id,
        },JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            date:{
                token,
                user
            }
        })
    }
    catch(err){

        next(err);
    }
}

export const signOut=async (req, res,next) => {
    //implement the signOut logic


}