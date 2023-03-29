import { Schema, model, models } from "mongoose";

const requestSchema = new Schema(
  {
    zone: String,
    state: String,
    requesterId: String,
    email: String,
    requester: String,
    samples: [{ name: String, num: String }],
    numOfSamples: Number,
    properPackage: String,
    requesterPhoneNumber: String,
    size: Number,
    numOfBoxes: Number,
    destinations: [String],
    pickup: String,
    contact: String,
    phoneNumber: String,
    status: String,
    approver: {
      fullName: String,
      email: String,
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      status: String,
      date: Date,
      comment: String,
    },
    logistics: {
      fullName: String,
      email: String,
      company: String,
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      status: String,
      date: Date,
      comment: String,
    },
    picker: {
      fullName: String,
      email: String,
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      status: String,
      date: Date,
      comment: String,
    },

    dropper: {
      fullName: String,
      email: String,
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      status: String,
      date: Date,
      comment: String,
    },
  },
  {
    timestamps: true,
  }
);

const Request = models.Request || model<any>("Request", requestSchema);

export default Request;
