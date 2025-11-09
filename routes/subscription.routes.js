import {Router} from "express";
import authorize from "../Middlewares/auth.middleware.js";
import {
    createSubscriptions,
    getAllSubscriptions,
    getSpecificUserSubscription
} from "../Controllers/subscription.controller.js";

const subRoutes = Router();

subRoutes.get("/",getAllSubscriptions);


subRoutes.post("/",authorize,createSubscriptions);

subRoutes.put("/:id", (req, res) => {
    res.send("Update a subscription");
})
subRoutes.delete("/:id", (req, res) => {
    res.send("Delete a subscription");
})

subRoutes.get("/user/:id", authorize,getSpecificUserSubscription);


subRoutes.put("/:id/cancel", (req, res) => {
    res.send("Cancel a specific subscription");
})
subRoutes.get("/upcoming-subs", (req, res) => {
    res.send("Get upcoming subscriptions");
})






export default subRoutes;