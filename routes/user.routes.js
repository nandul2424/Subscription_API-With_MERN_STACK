import {Router} from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    res.send("Get all users");
})
userRoutes.get("/:id", (req, res) => {
    const {id} = req.params;
    res.send(`Get user details of ${id}`);
})

userRoutes.post("/", (req, res) => {
    res.send("Create new user");
})
userRoutes.put("/:id", (req, res) => {
    res.send("Update user");
})
userRoutes.delete("/:id", (req, res) => {
    res.send("Delete user");
})




export default userRoutes;