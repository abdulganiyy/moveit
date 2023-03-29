import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    admin: Boolean,
    role: String,
    zone: String,
    zones: [String],
    company: String,
    phoneNumber: String,
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<any>("User", userSchema);

export default User;
