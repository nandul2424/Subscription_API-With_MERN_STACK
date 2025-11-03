import {Router} from "express";
import {getAllUsers, getUser} from "../Controllers/user.controller.js";
import authorize from "../Middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id",authorize,getUser);

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