import {Schema, model} from "mongoose";

const orderSchema = new Schema({
    dateOrder: {type: Date, default: Date.now},
    foods: [
        {
            food: { type: Schema.Types.ObjectId, ref: "Food" },
            quantity: Number,
            imgUrl: String,
        }
    ],
    userID: {type: Schema.Types.ObjectId, ref: 'User'},
    createAt: Date,
})

const Order = model("order", orderSchema);
export {Order}