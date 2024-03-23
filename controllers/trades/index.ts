import express from "express";
import Trade from "../../models/Trade";

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

export default router;
