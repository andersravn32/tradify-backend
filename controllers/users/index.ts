import express from "express";
import User from "../../models/User";

const router = express.Router();

router.get("/:identifier", async (req, res) => {
  const user = await User.findOne({
    identifier: req.params.identifier,
  }).populate("profile");
  if (!user) {
    return res.status(404).json({});
  }

  return res.json(user);
});

export default router;
