import express from "express";
import { Profile, Trade, User } from "../../models";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.json(req.user);
});

router.post("/profile", async (req, res) => {
  const { firstName, lastName, bio } = req.body;

  const user = await User.findById(req.user._id);
  if (user && user.profile) {
    return res.status(409).json({});
  }

  const profile = await Profile.create({
    firstName: firstName,
    lastName: lastName,
    bio: bio,
    avatar: "",
    cover: "",
  });

  

  return res.json(profile);
});

router.get("/trades", async (req, res) => {
  const trades = await Trade.find({
    $or: [
      { "creator.user": req.user },
      { "receiver.user": req.user },
      { "middleman.user": req.user },
    ],
  })
    .populate("creator.rating")
    .populate("receiver.rating")
    .populate("middleman.rating");

  return res.json(trades);
});
export default router;
