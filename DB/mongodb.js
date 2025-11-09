import mongoose from "mongoose";
import { DB_URI, TEST_DB_URI, NODE_ENV } from "../Config/env.js";

const connectToDatabase = async () => {

    if (process.env.NODE_ENV === "test") {
        console.log("🧪 Using in-memory MongoDB (no real connection).");
        return; // don't connect to real Mongo in tests
    }


    try {
        const uri = DB_URI;
        console.log("🔗 Connecting to the real db:", uri);

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("❌ DB connection failed:", error);
        if (NODE_ENV !== "test") process.exit(1); // avoid killing Jest
    }
};

export default connectToDatabase;
