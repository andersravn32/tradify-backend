import mongoose, { Schema, Types } from "mongoose";

export enum TradeRole {
  Creator,
  Receiver,
  Middleman,
}

export enum TradeResponseState {
  Pending,
  Accepted,
  Rejected,
}

export interface ITrade {
  title: string;
  description: string;
  creator: {
    user: Types.ObjectId;
    rating?: Types.ObjectId;
    state: TradeResponseState;
  };
  receiver: {
    user: Types.ObjectId;
    rating?: Types.ObjectId;
    state: TradeResponseState;
  };
  middleman?: {
    user: Types.ObjectId;
    rating?: Types.ObjectId;
    state: TradeResponseState;
  };
}

export const tradeSchema = new mongoose.Schema<ITrade>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  creator: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Schema.Types.ObjectId,
      ref: "Rating",
      default: null,
    },
    state: {
      type: Number,
      default: TradeResponseState.Pending,
    },
  },
  receiver: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Schema.Types.ObjectId,
      ref: "Rating",
      default: null,
    },
    state: {
      type: Number,
      default: TradeResponseState.Pending,
    },
  },
  middleman: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rating: {
      type: Schema.Types.ObjectId,
      ref: "Rating",
      default: null,
    },
    state: {
      type: Number,
      default: TradeResponseState.Pending,
    },
  },
});

const Trade = mongoose.model<ITrade>("Trade", tradeSchema);

export default Trade;
