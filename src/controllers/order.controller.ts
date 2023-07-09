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

  static async getCartCount(req: any, res: any) {
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
        const count = data.length;
        res.json(count);
      } else {
        return;
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
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
        res.render("cart", { data: data, alert: null });
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

  static async checkOut(req: any, res: any) {
    try {
      const userId = req.user.id;
      const foods = await Order.find({ userID: userId }).populate("foods.food");
      let data = [];
      const now = new Date().toDateString();
      foods.forEach((item) => {
        if (item.dateOrder.toDateString() === now) {
          data.push(item);
        }
      });
      let failCheck = 0;
      let foodArray = req.body.foodType;
      foodArray.forEach((item) => {
        if (item === "Món thịt") {
          failCheck++;
        }
      });

      if (foodArray.length > 4) {
        const alert = "Đặt tối đa 4 món!";
        res.render("cart", { data: data, alert: alert });
      } else if (failCheck > 3) {
        const alert = "Đặt tối đa 3 món thịt!";
        res.render("cart", { data: data, alert: alert });
      } else {
        console.log(`Success!`);
        //   Xử lý logic khi book thành công tại đây!
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }
}

export default OrderController;
