import aj from '../Config/arcjet.js';

const arcjetMiddleware=async(req,res,next)=>{

    try{
        const decision=await aj.protect(req);

        if(!decision){

            if(decision.reason.isRateLimit()){
                return res.status(403).json({
                    message:"Rate limit is exceeded"
                })
            }

            else if(decision.reason.isBot()){
                return res.status(403).json({
                    message:"Bot is detected"
                })
            }

            return res.status(403).json({
                error:"access denied"
            })
        }


    }

    catch(err){
        console.log(err,"arcjet middleware error");
        next(err);
    }
}

export default arcjetMiddleware;