import express from "express";
import { User } from "../../models";

const router = express.Router();

router.get("/validate/email/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 3000);
    });

    return res.json(!user);
  }
  return res.json(!user);
});

router.get("/validate/identifier/:identifier", async (req, res) => {
  const user = await User.findOne({ identifier: req.params.identifier });
  if (user) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 3000);
    });

    return res.json(!user);
  }
  return res.json(!user);
});

export default router;
