import {Schema, model} from "mongoose";

const orderSchema = new Schema({
    dateOrder: {type: Date, default: Date.now},
    foods: [{type: Schema.Types.ObjectId, ref: 'Food'}],
    userID: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Order = model("order", orderSchema);
export {Order}