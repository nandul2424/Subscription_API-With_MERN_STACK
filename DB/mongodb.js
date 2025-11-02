import mongoose from 'mongoose';

import {DB_URI} from "../Config/env.js";

if(!DB_URI){
    throw new Error('MongoDB URI doesn\'t exist');
}

const connectToDbFunction=async()=>{
        try {
            await mongoose.connect(DB_URI);
            console.log("MongoDB Connected!");
        }catch (error){
            console.error(error);
        }
}


export default connectToDbFunction;