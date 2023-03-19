import { Schema, model, models } from "mongoose";

const requestSchema = new Schema(
  {
    zone: String,
    state: String,
    requesterId: String,
    requester: String,
    samples: [String],
    numOfSamples: Number,
    properPackage: Boolean,
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
      date: Date,
      comments: [String],
    },
    logistics: {
      fullName: String,
      date: Date,
      comments: [String],
    },
    personel: {
      fullName: String,
      date: Date,
      comments: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Request = models.Request || model<any>("Request", requestSchema);

export default Request;
