import {Schema, model} from "mongoose";

const classSchema = new Schema({
    name: String
})

const ClassName = model("className", classSchema);
export {ClassName}