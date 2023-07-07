class UserController {
  static async showLoginForm(req: any, res: any) {
    res.render("login");
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
}

export default UserController;
