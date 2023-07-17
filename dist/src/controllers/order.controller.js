"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/schemas/user.model"));
const food_model_1 = __importDefault(require("../models/schemas/food.model"));
const order_model_1 = require("../models/schemas/order.model");
class OrderController {
    static async addToCart(req, res) {
        try {
            let { id, userId } = req.body;
            let food = await food_model_1.default.findOne({ _id: id });
            let user = await user_model_1.default.findOne({ _id: userId });
            if (food && food.status) {
                let orders = await order_model_1.Order.find({ userID: userId });
                let order = orders[orders.length - 1];
                if (!(order && order.createAt.toDateString() === new Date().toDateString())) {
                    order = new order_model_1.Order();
                    order.createAt = new Date();
                    order.userID = user._id;
                }
                if (order.status === 'waiting') {
                    let existingOrder = order.foods.find(item => item.food.toString() === id);
                    if (existingOrder) {
                        existingOrder.quantity = existingOrder.quantity + 1;
                    }
                    else {
                        order.foods.push({
                            food: food._id,
                            quantity: 1,
                            imgUrl: food.imageUrl,
                        });
                    }
                }
                await order.save();
                return res.json("ok");
            }
            else {
                res.send("not ok");
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
    static async getCartCount(req, res) {
        try {
            if (req.user) {
                const userId = req.user.id;
                const order = await order_model_1.Order.find({ userID: userId, status: "waiting" });
                let count = 0;
                const now = new Date().toDateString();
                let food = order[order.length - 1];
                if (food && food.createAt.toDateString() === now) {
                    count = food.foods.reduce((total, item) => total + item.quantity, 0);
                }
                res.json(count);
            }
            else {
                return;
            }
        }
        catch (err) {
            console.log(err.message);
            res.render("404");
        }
    }
    static async showCart(req, res) {
        try {
            if (req.user) {
                const userId = req.user.id;
                const foods = await order_model_1.Order.find({ userID: userId }).populate("foods.food");
                let order = foods[foods.length - 1];
                const now = new Date().toDateString();
                let data = {};
                if (order && order.createAt.toDateString() === now) {
                    data = order;
                }
                ;
                res.render("cart", { data: data, alert: null });
            }
        }
        catch (err) {
            console.log(err.message);
            res.render("404");
        }
    }
    static async deleteOrder(req, res) {
        try {
            const order = await order_model_1.Order.findOne({ _id: req.body.id, userID: req.user.id });
            let foodId = req.body.foodId;
            let food = await food_model_1.default.findOne({ _id: foodId });
            if (req.user && order.userID.toString() === req.user.id && food) {
                const updatedProductCart = await order_model_1.Order.findOneAndUpdate({ _id: order._id }, { $pull: { foods: { food: foodId } } });
                if (updatedProductCart) {
                    return res.json(food);
                }
            }
            else {
                return res.json('please login');
            }
        }
        catch (err) {
            return res.json(err.message);
        }
    }
    static async checkOut(req, res) {
        try {
            const userId = req.user.id;
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
            const order = await order_model_1.Order.findOne({
                userID: userId,
                createAt: { $gte: startOfDay, $lte: endOfDay }
            }).populate("foods.food");
            if (order) {
                let foods = order.foods;
                let countFood = foods.reduce((total, item) => total + item.quantity, 0);
                let alert = { errors: "", success: "" };
                let failCheck = false;
                foods.forEach((item) => {
                    if (item.food.type == "Món thịt" && item.quantity > 3) {
                        failCheck = true;
                    }
                });
                if (countFood > 4) {
                    alert.errors = "Đặt tối đa 4 món!";
                }
                else if (countFood == 4) {
                    if (failCheck) {
                        alert.errors = '"Đặt tối đa 3 món mặn!"';
                    }
                    else {
                        order.status = "success";
                        if (order.save()) {
                            alert.success = 'Đặt thành công! VUi lòng vào phần User Dashboard để kiểm tra thông tin';
                        }
                        else {
                            alert.errors = 'Đặt thất bại!';
                        }
                    }
                    res.render("cart", { alert: alert, data: order });
                }
            }
        }
        catch (err) {
            console.log(err.message);
            res.render("404");
        }
    }
    static async UpdateCount(req, res) {
        let { id, foodId, math } = req.body;
        let order = await order_model_1.Order.findOne({ userID: req.user.id, _id: id }).populate("foods.food");
        if (order) {
            let food = order.foods.find(item => item.food._id.toString() === foodId);
            if (food) {
                if (math == 'difference' && food.quantity > 1) {
                    food.quantity = food.quantity - 1;
                }
                else if (math == 'total' && food.quantity < 4) {
                    food.quantity = food.quantity + 1;
                }
                await order.save();
            }
            return res.json(food);
        }
        else {
            res.send('error');
        }
    }
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map