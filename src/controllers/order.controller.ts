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
        const order = await Order.find({ userID: userId , status: "waiting"})
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
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      const order = await Order.findOne({
        userID: userId,
        createAt: { $gte: startOfDay, $lte: endOfDay }
      }).populate("foods.food");
      if (order){
        let foods = order.foods
        let countFood = foods.reduce((total, item) => total + item.quantity, 0)
        let alert = {errors: "", success:""}
        let failCheck = false
        foods.forEach((item) => {
          // @ts-ignore
          if (item.food.type == "Món thịt" && item.quantity > 3 ){
            failCheck = true
          }
        })
        if (countFood > 4){
          alert.errors = "Đặt tối đa 4 món!"
        } else if (countFood == 4){
          if (failCheck) {
            alert.errors = '"Đặt tối đa 3 món mặn!"'
          } else {
            order.status = "success"
            if (order.save()){
              alert.success = 'Đặt thành công! VUi lòng vào phần User Dashboard để kiểm tra thông tin'
            } else {
              alert.errors = 'Đặt thất bại!'
            }
          }
          res.render("cart", {alert: alert, data: order})
        }
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }

  static async UpdateCount(req:any , res:any){
    let {id, foodId, math} = req.body
    let order = await Order.findOne({userID: req.user.id, _id: id}).populate(
        "foods.food"
    );
    if (order) {
      let food = order.foods.find(item => item.food._id.toString() === foodId);
      if (food) {
        if (math == 'difference' && food.quantity > 1){
          food.quantity = food.quantity - 1
        } else if ( math == 'total' && food.quantity < 4){
          food.quantity = food.quantity + 1
        }
        await order.save()
      }
      return res.json(food)
    } else {
      res.send('error')
    }
  }
}

export default OrderController;
