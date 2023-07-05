import {Schema, model} from "mongoose";

const classSchema = new Schema({
    name: String,
    imageUrl: String,
})

const className = model("class", classSchema);
export {className}