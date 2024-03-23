import mongoose, { Schema, Types } from "mongoose";

export enum TokenType {
  Access,
  Refresh,
  SignupConfirmation,
}

export interface IToken {
  user: Types.ObjectId;
  type: TokenType;
  token: string;
}

export const tokenSchema = new mongoose.Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: Number, required: true },
  token: { type: String, required: true },
});

const Token = mongoose.model<IToken>("Token", tokenSchema);

export default Token;
