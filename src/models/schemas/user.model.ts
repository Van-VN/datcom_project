import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name: String,
    role: String,
    password: String,
    className: {type: Schema.Types.ObjectId, ref:'ClassName'}
})
const User = model("user", userSchema);
export {User}