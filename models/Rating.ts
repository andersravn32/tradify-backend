import mongoose, { Schema, Types } from "mongoose";

export enum RatingType {
  Positive,
  Neutral,
  Negative,
}

export interface IRating {
  type: RatingType;
  creator: Types.ObjectId;
  comment?: string;
}

export const ratingSchema = new mongoose.Schema<IRating>({
  type: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

const Rating = mongoose.model<IRating>("Rating", ratingSchema);

export default Rating;
