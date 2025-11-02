import express from "express";
import {PORT}  from "./Config/env.js";
import connectToDatabase from "./DB/mongodb.js";

const app = express();
import authRoutes from "./routes/auth.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/auth",authRoutes); //go to api/v1/auth endpoint for authRoutes
app.use("/api/v1/subscriptions",subscriptionRoutes);
app.use("/api/v1/users",userRoutes);


app.get("/", (req, res) => {
    res.send("HELLO FROM THE SERVER");
})

app.listen(PORT,async()=>{
    console.log(`Server running on port ${PORT}`);

    await connectToDatabase();
})





export default app;

