import mongoose, { Schema, Types } from "mongoose";

export enum NotificationType {
  TradeCreated,
  TradeReceived,
  TradeRated,
  TradeCompleted,
}

export interface INotification {
  _id: Types.ObjectId;
  receiver: Types.ObjectId;
  notifier?: Types.ObjectId;
  type: NotificationType;
  isRead: boolean;
}

export const notificationSchema = new mongoose.Schema<INotification>({
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notifier: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
  type: {
    type: Number,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;
