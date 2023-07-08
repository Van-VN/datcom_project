import User from "../models/schemas/user.model";
const blockSwitchFromCusMiddleware = async (req: any, res: any, next: any) => {
  if (req.user) {
    let id = req.session.passport.user.id;
    let customer = await User.findOne({ _id: id });
    if (customer) {
      next();
    } else {
      res.redirect("/");
    }
  } else {
      const data = "Tên đăng nhập hoặc mật khẩu không chính xác!"
    res.render("login", {data: data});
  }
};

export default blockSwitchFromCusMiddleware;
