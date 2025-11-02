import {Router} from "express";

const authRoutes = Router();

authRoutes.get("/sign-up", (req, res) => {
    res.send("SignUp successfull");
})
authRoutes.post("/sign-in", (req, res) => {
    res.send("SignIn successfull");
})
authRoutes.post("/sign-out", (req, res) => {
    res.send("SignOut successfull");
})




export default authRoutes;