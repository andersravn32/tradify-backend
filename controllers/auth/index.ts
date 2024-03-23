import express from "express";
import signup from "./email/signup";
import signin from "./email/signin";

const router = express.Router();

router.post("/email/signup", signup);
router.post("/email/signin", signin);

export default router;
