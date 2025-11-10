import {createRequire} from 'module'
import dayjs from 'dayjs'
import workflowRouter from "../routes/workflow.routes.js";
import Subscription from "../Models/subscription.model.js";
const require=createRequire(import.meta.url);
const {serve} =require('@upstash/workflow/express');
//to use commonjs syntax to require serve module

const REMINDERS=[7,5,2,1];

export const sendReminders = serve(async(context)=>{

    const {subscriptionId} = context.requestPayload;
    const subscription=await fetchSubscription(context,subscriptionId);

    if(!subscription || subscription.status!='active'){
        return;
    }

    const renewalDate=dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date is passed for subscription ${subscriptionId}.. stopping workflow`);
        return;
    }

    for(const daysBefore of REMINDERS){
        const reminderDate=renewalDate.subtract(daysBefore,'day');

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context,`reminder ${daysBefore} days before`,reminderDate);
        }

        await triggerReminder(context,`Reminder ${daysBefore} days before`);
    }
}

)

const fetchSubscription=async(context,subscriptionId)=>{

    return await context.run('get subscriptions',()=>{
        return Subscription.findById(subscriptionId).populate('user','name email');
    });
}

const sleepUntilReminder=async (context,label,date)=>{
    console.log(`Sleep until ${label} remainder at ${date}`);
    await context.sleepUntil(label,date.toDate());
}

const triggerReminder=async (context,label)=>{
    return await context.run(label,()=>{
        console.log(`Triggering ${label} reminder`);

    })
}