import User from "../Models/user.model.js";

export const getAllUsers = async(req,res,next) => {

    try{
        const users=await User.find();

        res.status(200).json({
            success:true,
            data:users
        });


    }catch(err){
        next(err);
    }
}

export const getUser = async(req,res,next) => {

    try{
        const user=await User.findById(req.params.id).select("-password");
        //finding the user with their id

        if(!user){
            const error=new Error("User not found");
            error.statusCode=404;
            throw error;
        }

        res.status(200).json({
            success:true,
            data:user
        })



    }catch(err){
        next(err);
    }
}

