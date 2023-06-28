import {Schema, model} from "mongoose";

const productSchema = new Schema({
    name: String,
    model: String,
    place: String,
    category_id: {type: Schema.Types.ObjectId, ref: "Category"},
    vote: Number,
    created_at: { type: Date, default: Date.now },
    color: String,
    price: Number,
    quantity: Number,
    status: String,
    description: String
})
const Product = model('Product', productSchema)
export {Product}
export default class product {
}