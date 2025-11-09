// process.env.NODE_ENV = "test";
//
// import mongoose from "mongoose";
// import request from "supertest";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import app from './app.js'
// import User from "./Models/user.model.js";
// import {afterAll, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
//
//
//
// let mongoServer;
//
// beforeAll(async () => {
//
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//
//     if (mongoose.connection.readyState !== 0) {
//         await mongoose.disconnect();
//     }
//
//     await mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
// });
//
// afterAll(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongoServer.stop();
// });
//
// describe("Checking the sign-up POST api with SuperTest", () => {
//
//
//
//     it("should create account successfully with correct credentials", async () => {
//         const res = await request(app).post("/api/v1/auth/sign-up").send(
//             { name:"Nandul",
//                 email: "nandulhissella@gmail.com",
//                 password: "Inandul24$"
//             });
//
//         expect(res.status).toBe(201);
//         expect(res.body.message).toBe("User created successfully");
//     });
//
//     it("should fail with missing fields", async () => {
//         const res = await request(app)
//             .post("/api/v1/auth/sign-up")
//             .send({ email: "nandulhissella@gmail.com", password: "dummypwd" });
//
//         expect(res.status).toBe(400);
//
//     });
//
//     it("should fail if email is duplicated", async () => {
//         const res = await request(app)
//             .post("/api/v1/auth/sign-in")
//             .send({ email: "test@test.com", password: "123456", name:"Dummy user" });
//
//         expect(res.status).toBe(409);
//     });
// });
