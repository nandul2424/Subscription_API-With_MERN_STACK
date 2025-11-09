
import express from "express";
import { PORT, NODE_ENV } from "./Config/env.js";
import connectToDatabase from "./DB/mongodb.js";
import errorHandler from "./Middlewares/error.middleware.js";
import arcjetMiddleware from "./Middlewares/arcjet.middleware.js";
import authorize from "./Middlewares/auth.middleware.js";

const app = express();

import authRoutes from "./routes/auth.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import userRoutes from "./routes/user.routes.js";
import authMiddleware from "./Middlewares/auth.middleware.js";

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/users", userRoutes);


app.use(errorHandler);
//app.use(arcjetMiddleware);
app.use(authorize);

app.get("/", (req, res) => {
    res.send("HELLO FROM THE SERVER");
});

if (process.env.NODE_ENV !== "test") {
    connectToDatabase().then(() => {
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    });
}

export { app, connectToDatabase };
export default app;
