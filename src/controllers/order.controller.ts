import User from "../models/schemas/user.model";
import Food from "../models/schemas/food.model";
import { Order } from "../models/schemas/order.model";

class OrderController {
  static async addToCart(req: any, res: any) {
    try {
      let { id, userId } = req.body;
      let food = await Food.findOne({ _id: id });
      let user = await User.findOne({ _id: userId });
      if (food && food.status) {
        let orders = await Order.find({userID: userId})
        let order = orders[orders.length - 1]
        if ( !(order && order.createAt.toDateString() === new Date().toDateString())){
          order = new Order();
          order.createAt = new Date();
          order.userID = user._id;
        }
        let existingOrder = order.foods.find(item => item.food.toString() === id);
        if (existingOrder){
          existingOrder.quantity = existingOrder.quantity + 1
        } else {
          order.foods.push({
            food: food._id,
            quantity: 1,
            imgUrl: food.imageUrl,
          });
        }
        await order.save();
        return res.json("ok");
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
        const order = await Order.find({ userID: userId })
        let count = 0;
        const now = new Date().toDateString();
        let food = order[order.length - 1];
        if (food && food.createAt.toDateString() === now) {
          count = food.foods.reduce((total, item) => total + item.quantity, 0);
        }
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
        let order = foods[foods.length - 1]
        const now = new Date().toDateString();
        let data = {};
        if (order && order.createAt.toDateString() === now){
          data = order
        };
        res.render("cart", { data: data, alert: null });
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }

  static async deleteOrder(req: any, res: any) {
    try {
      const order = await Order.findOne({ _id: req.body.id , userID: req.user.id });
      let foodId = req.body.foodId
      let food = await Food.findOne({ _id: foodId });
      if (req.user && order.userID.toString() === req.user.id && food) {
          const updatedProductCart = await Order.findOneAndUpdate(
              { _id: order._id },
              { $pull: { foods: { food: foodId } } }
          );
          if (updatedProductCart) {
            return res.json(food);
          }

      } else {
        return res.json('please login');
      }
    } catch (err) {
      return res.json(err.message);
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
        // foods.status = "accepted"
        // if ( await foods.save()){
        //
        // }
        console.log(req.body)
        //   Xử lý logic khi book thành công tại đây!
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }
}

export default OrderController;
