class UserController {
  static async showLoginForm(req: any, res: any) {
    res.render("login");
  }

  static getUserInfo(req: any, res: any) {
    console.log(req.body);
    res.redirect("/");
  }
}

export default UserController;
