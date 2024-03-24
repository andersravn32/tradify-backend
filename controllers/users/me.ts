import express from "express";
import { Trade } from "../../models";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.json(req.user);
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
