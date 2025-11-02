import mongoose from 'mongoose';
import subscriptionRoutes from "../routes/subscription.routes.js";

const subSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"subscription name is required"],
        minLength:2,
        maxLength:200,
    },

    price:{
        type:Number,
        required:[true,"price is required"],
        minLength:[0,"Price should be greater than 0"],
    },

   currency:{
        type:String,
        enum:
            ['USD','LKR','INR','AUSD','EUR','RING']
   } ,
    frequency:{
        type:String,
        enum:[
            'daily','weekly','monthly','yearly'
        ]
    },

    category:{
        type:String,
        required:[true,"category"],
        enum:['sport','entertainment','education','finance','other'],
    },

    paymentMethod:{
        type:String,
        enum:[
            'credit_card','debit_card','paypal'
        ]
    },
    status:{
        type:String,
        enum:[
            'active','canceled','expired',
        ]
    },
    startDate:{
        type:Date,
        validate:{
            validator:(value)=>value<=new Date(),
            message: 'Invalid date format for subscription starting date'

        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator:function(value){
                return value>this.startDate;
            },
            message: 'Invalid date format for subscription renewal date'

        }
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"user is required"],
        index:true,
    }

}, {
    timeStamps: true
});

const Subscription=new mongoose.model('User',subSchema);

export default Subscription;