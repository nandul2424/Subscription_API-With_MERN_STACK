
import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../Config/upstash.js";
import {SERVER_URL} from "../Config/env.js";

export const createSubscriptions=async(req,res,next)=>{

    try{
        const newSubscription=await Subscription.create({
            ...req.body,
            user:req.user._id
        });

        const {workflowRunId}=await workflowClient.trigger({
            url:`${SERVER_URL}/api/v1/subscriptions/reminder`,
            body:{
                subscriptionId:newSubscription.id
            },
            headers:{
                "Content-Type":"application/json"
            }

        });

        res.status(201).json({
            status:"success",
            data:newSubscription
        });

    }
    catch(err){
        next(err);
    }

}

export const getSpecificUserSubscription=async(req,res,next)=>{

    try{

        if(req.user.id!=req.params.id){

            const error=new Error("Access denied");
            res.status(401);
            throw error;

        }

        const theirSubs=await Subscription.find({
            user:req.params.id
        })

        res.status(200).json({
            status:"success",
            data:theirSubs
        })
    }
    catch(err){
        next(err);
    }
}

export const getAllSubscriptions=async(req,res,next)=>{

    try{

        const allSubs=await Subscription.find({

        });

        res.status(200).json({
            status:"success",
            data:allSubs
        })


    }catch(err){
        next(err);
    }
}