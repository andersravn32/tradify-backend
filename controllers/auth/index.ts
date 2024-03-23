import express from "express";
import refresh from "./refresh"
import signup from "./email/signup";
import signin from "./email/signin";

const router = express.Router();

router.post("/refresh", refresh)

router.post("/email/signup", signup);
router.post("/email/signin", signin);

export default router;
