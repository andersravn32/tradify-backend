import express from "express";
import User from "../../models/User";
import meRouter from "./me";

const router = express.Router();

router.use("/me", meRouter);

router.get("/:identifier", async (req, res) => {
  const user = await User.findOne({
    identifier: req.params.identifier,
  });
  if (!user) {
    return res.status(404).json({});
  }

  return res.json(user);
});

export default router;
