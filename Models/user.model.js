import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"user name is required"],
        minLength:2,
        maxLength:225,
    },

    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:/^[a-z0-9]+$/,
        lowercase:true,
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