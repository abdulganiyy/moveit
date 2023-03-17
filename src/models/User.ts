import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  admin: Boolean,
  role: String,
});

const User = model("User", userSchema);

export default User;
