import {Router} from "express";
import {signIn, signOut, signUp} from "../Controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);
authRoutes.post("/sign-out",signOut);

//when navigated to those api-end points , logics from the controllers are to be performed



export default authRoutes;