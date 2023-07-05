import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: String,
    role: String,
    password: String,
})
const user = model("user", userSchema);
export {user}