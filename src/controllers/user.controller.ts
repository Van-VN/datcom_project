import User from "../models/schemas/user.model";

class UserController {
  static async showLoginForm(req: any, res: any) {
    res.render("login", { data: null });
  }

  static getUserInfo(req: any, res: any) {
    res.redirect("/");
  }

  static showUserPage(req: any, res: any) {
    try {
      res.render("user");
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
