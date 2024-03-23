import mongoose from "mongoose";
import Config from "./utils/Config";
import User from "./models/User";
import Trade, { TradeResponseState } from "./models/Trade";

const main = async () => {
  // Connect to MongoDB through mongoose
  const url = `mongodb+srv://${Config.variables.mongodb.username}:${Config.variables.mongodb.password}@${Config.variables.mongodb.hostname}/?retryWrites=true&w=majority&appName=${Config.variables.mongodb.database}`;
  await mongoose.connect(url);

  const user = await User.findById("65feda6b36f9719a56c26aff")!;
  if (!user) return;

  const trade = await Trade.create({
    title: "2",
    creator: { user: user, state: TradeResponseState.Accepted },
    receiver: { user: user },
  });

  console.log(trade);
};

// Initialize
main().catch((e) => console.log(e));
