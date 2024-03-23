import express from "express";
import authRouter from "./controllers/auth";
import usersRouter from "./controllers/users";
import tradesRouter from "./controllers/trades";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/users", usersRouter);

router.use("/trades", tradesRouter);

export default router;
