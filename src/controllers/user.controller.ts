import User from "../models/schemas/user.model";
import {Order} from "../models/schemas/order.model";

class UserController {
  static async showLoginForm(req: any, res: any) {
    res.render("login", { data: null });
  }

  static getUserInfo(req: any, res: any) {
    res.redirect("/");
  }

  static async showUserPage(req: any, res: any) {
    try {
      if (req.user){
        const userId = req.user.id;
        const order = await Order.find({ userID: userId , status: "success"}).populate(
            "foods.food"
        ).sort({ createAt: -1 });
         res.render("user", {data: order});
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  static showCart(req: any, res: any) {
    try {
      res.render("cart");
    } catch (err) {
      console.log(err.message);
    }
  }

  static checkLogged(req: any, res: any) {
    try {
      if (req.user) {
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }

  static showEditPassword(req: any, res: any) {
    res.render("usereditpassword", { data: null });
  }

  static async updateUserPassword(req: any, res: any) {
    try {
      const user = await User.findOne({ _id: req.user.id }).populate(
        "password"
      );
      if (user.password === req.body.oldpassword) {
        if (req.body.newpassword === req.body.newpasswordconfirm) {
          user.password = req.body.newpassword;
          await user.save();
          res.redirect("/logout");
        } else {
          const data = "Mật khẩu mới nhập không trùng nhau!";
          res.render("usereditpassword", { data: data });
        }
      } else {
        const data = "Mật khẩu cũ không chính xác";
        res.render("usereditpassword", { data: data });
      }
    } catch (err) {
      console.log(err);
      res.redirect("/404");
    }
  }
}

export default UserController;
