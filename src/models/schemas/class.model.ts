import {Schema, model} from "mongoose";

const classSchema = new Schema({
    name: String,
})

const className = model("class", classSchema);
export {className}