import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  name: String,
  type: String,
  des: String,
  imageUrl: String,
  status: { type: Boolean, default: true },
  comment: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],
});

const Food = model("class", foodSchema);
export default Food;
