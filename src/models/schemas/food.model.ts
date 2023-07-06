import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: String,
  type: String,
  des: String,
  imageUrl: String,
  status: { type: Boolean, default: true },
});

const Food = model("class", foodSchema);
export default Food;
