import express from "express";
import authRouter from "./controllers/auth";
import utilitiesRouter from "./controllers/utilities";
import usersRouter from "./controllers/users";
import tradesRouter from "./controllers/trades";
import Check from "./middleware/check";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/utilities", utilitiesRouter);

router.use("/users", Check.Auth, usersRouter);

router.use("/trades", Check.Auth, tradesRouter);

export default router;
