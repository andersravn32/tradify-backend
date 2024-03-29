import mongoose, { Schema, Types } from "mongoose";

export enum Roles {
  Guest,
  Member,
  Middleman,
  Moderator,
  Administrator,
}

export interface IUser {
  _id: Types.ObjectId;
  identifier: string;
  verified: boolean;
  role: Roles;
  email: string;
  password: string;
  profile?: Types.ObjectId;
}

export const userSchema = new mongoose.Schema<IUser>({
  identifier: { type: String, required: true },
  verified: { type: Boolean, default: false },
  role: { type: Number, default: Roles.Guest },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
});
userSchema.index({ "$**": "text" });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
