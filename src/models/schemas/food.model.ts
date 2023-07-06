import {Schema, model} from "mongoose";

const foodSchema = new Schema({
    name: String,
    imageUrl: String,
})

const Food = model("food", foodSchema);
export {Food}