import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"user name is required"],
        minLength:2,
        maxLength:225,
    },

    email:{
            type: String,
            unique: true,
            required: [true, "email is required"],
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ✅ standard email pattern
            lowercase: true,
    },

    password:{
        type:String,
        required:[true,"password is required"],
        minLength:6,

    }
},{
    timestamps:true});

const User=new mongoose.model('User',userSchema);

export default User;