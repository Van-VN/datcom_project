import {Schema, model} from "mongoose";

const orderSchema = new Schema({
    dateOrder: {type: Date, default: Date.now},
    foods: [
        {
            food: { type: Schema.Types.ObjectId, ref: "food" },
            quantity: Number,
            imgUrl: String,
        }
    ],
    userID: {type: Schema.Types.ObjectId, ref: 'user'},
    status:  { type: String, default: "waiting" },
    createAt: { type: Date, default: Date.now },
})

const Order = model("order", orderSchema);
export {Order}