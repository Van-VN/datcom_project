import User from "../models/schemas/user.model";
import Food from "../models/schemas/food.model";
import { Order } from "../models/schemas/order.model";

class OrderController {
  static async addToCart(req: any, res: any) {
    try {
      let foodId = req.body.id;
      let food = await Food.findOne({ _id: foodId });
      let user = await User.findOne({ _id: req.body.userId });
      if (food && food.status) {
        let order = new Order();
        order.foods.push({
          food: food._id,
          quantity: 1,
          imgUrl: food.imageUrl,
        });
        order.createAt = new Date();
        order.userID = user._id;
        if (await order.save()) {
          res.send("ok");
        } else {
          res.send("not ok");
        }
      } else {
        res.send("not ok");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  static async showCart(req: any, res: any) {
    try {
      if (req.user) {
        const userId = req.user.id;
        const foods = await Order.find({ userID: userId }).populate(
          "foods.food"
        );
        let data = [];
        const now = new Date().toDateString();
        foods.forEach((item) => {
          if (item.dateOrder.toDateString() === now) {
            data.push(item);
          }
        });
        res.render("cart", { data: data });
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }

  static async deleteOrder(req: any, res: any) {
    try {
      const order = await Order.findOne({ _id: req.params.id });
      if (req.user && order.userID.toString() === req.user.id) {
        await Order.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/cart");
      } else {
        res.render("404");
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }
}

export default OrderController;
