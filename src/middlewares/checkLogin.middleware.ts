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
    res.redirect("/login");
  }
};

export default blockSwitchFromCusMiddleware;
