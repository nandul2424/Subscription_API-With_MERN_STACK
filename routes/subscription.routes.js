import {Router} from "express";

const subRoutes = Router();

subRoutes.get("/", (req, res) => {
    res.send("Get all subscriptions");
})
subRoutes.get("/:id", (req, res) => {
    const {id} = req.params;
    res.send(`Get a specific subscription of ${id}`);
})
subRoutes.post("/", (req, res) => {
    res.send("Create new subscription");
})
subRoutes.put("/:id", (req, res) => {
    res.send("Update a subscription");
})
subRoutes.delete("/:id", (req, res) => {
    res.send("Delete a subscription");
})

subRoutes.get("/user/:id", (req, res) => {
    res.send("Get a specific user's subscription");
})

subRoutes.put("/:id/cancel", (req, res) => {
    res.send("Cancel a specific subscription");
})
subRoutes.get("/upcoming-subs", (req, res) => {
    res.send("Get upcoming subscriptions");
})






export default subRoutes;