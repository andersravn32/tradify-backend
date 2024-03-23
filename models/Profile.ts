import mongoose, { Schema, Types } from "mongoose";

export interface IProfile {
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar: string;
  cover: string;
  bio: string;
}

export const profileSchema = new mongoose.Schema<IProfile>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true },
  cover: { type: String, required: true },
  bio: { type: String, required: false },
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
