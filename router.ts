import express from "express";
import authRouter from "./controllers/auth";
import usersRouter from "./controllers/users";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/users", usersRouter);

export default router;
