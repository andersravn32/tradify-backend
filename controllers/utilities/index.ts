import express from "express";
import { User } from "../../models";
import Check from "../../middleware/check";

const router = express.Router();

router.get("/validate/email/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  return res.json(!user);
});

router.get("/validate/identifier/:identifier", async (req, res) => {
  const user = await User.findOne({ identifier: req.params.identifier });
  return res.json(!user);
});

router.get("/search/users/:identifier", async (req, res) => {
  const users = await User.find({
    $text: { $search: req.params.identifier },
  })
    .populate("Profile")
    .limit(10);
  if (!users.length) {
    return res.status(404).json(users);
  }

  return res.json(users);
});

export default router;
