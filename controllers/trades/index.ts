import express from "express";
import Trade, { TradeRole, determineTradeRole } from "../../models/Trade";
import Rating, { IRating } from "../../models/Rating";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, creator, receiver, middleman } = req.body;
  const trade = await Trade.create({
    title,
    description,
    creator: { user: creator },
    receiver: { user: receiver },
    middleman: { user: middleman },
  });

  return res.json(trade);
});

router.put("/:identifier", async (req, res) => {
  const { title, description, creator, receiver, middleman } = req.body;
  const trade = await Trade.findByIdAndUpdate(
    req.params.identifier,
    {
      title,
      description,
      creator: { user: creator },
      receiver: { user: receiver },
      middleman: { user: middleman },
    },
    { new: true }
  );
  return res.json(trade);
});

router.delete("/:identifier", async (req, res) => {
  const result = await Trade.findByIdAndDelete(req.params.identifier);

  return res.json(result);
});

router.post("/:identifier/rate", async (req, res) => {
  const { type, comment } = req.body;

  const trade = await Trade.findById(req.params.identifier);
  if (!trade) {
    return res.status(404).json({});
  }

  const createRating = async (rating: IRating) => {
    const _rating = await Rating.create(rating);

    return _rating;
  };

  const role = determineTradeRole(trade, req.user);
  if (!role) {
    return res.status(404).json({});
  }

  switch (role.valueOf) {
    case TradeRole.Creator.valueOf: {
      if (trade.creator.rating) {
        return res.status(409).json({});
      }

      // Create rating on creator
      trade.creator.rating = (
        await createRating({
          type,
          creator: req.user!._id,
          comment,
        })
      )._id;

      break;
    }

    case TradeRole.Receiver.valueOf: {
      if (trade.receiver.rating) {
        return res.status(409).json({});
      }

      // Create rating on receiver
      trade.receiver.rating = (
        await createRating({
          type,
          creator: req.user!._id,
          comment,
        })
      )._id;

      break;
    }

    case TradeRole.Middleman.valueOf: {
      if (!trade.middleman) {
        return res.status(404).json({});
      }
      if (trade.middleman.rating) {
        return res.status(409).json({});
      }

      // Create rating on creator
      trade.middleman.rating = (
        await createRating({
          type,
          creator: req.user!._id,
          comment,
        })
      )._id;

      break;
    }
  }

  // Save changes to trade
  await trade.save();

  return res.json(trade);
});
export default router;
