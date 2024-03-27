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
  user: { type: Schema.Types.ObjectId, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  avatar: { type: String, default: null },
  cover: { type: String, default: null },
  bio: { type: String, default: null },
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
