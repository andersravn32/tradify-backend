import mongoose, { Types } from "mongoose";

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
}

export const userSchema = new mongoose.Schema<IUser>({
  identifier: { type: String, required: true },
  verified: { type: Boolean, default: false },
  role: { type: Number, default: Roles.Guest },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
