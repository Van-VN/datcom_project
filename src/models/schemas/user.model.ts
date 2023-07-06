import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  fullName: String,
  role: { type: String, default: "User" },
  password: String,
  className: String,
});
const User = model("user", userSchema);
export default User;
