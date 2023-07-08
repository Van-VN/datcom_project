import Food from "../models/schemas/food.model";
import User from "../models/schemas/user.model";

class HomeController {
  static async getHomePage(req: any, res: any) {
    try {
      const foods = await Food.find({ status: "true" });
      return res.render("home", { data: foods });
    } catch (err) {
      console.log(err);
    }
  }

  static async showFoodDetail(req: any, res: any) {
    try {
      const foodId = req.params.id;
      const food = await Food.findOne({ _id: foodId }).populate(
        "comment.postedBy"
      );
      res.render("foodDetail", { data: food, alert: null });
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }

  static async foodComment(req: any, res: any) {
    try {
      const food = await Food.findOne({ _id: req.params.id });
      if (req.user) {
        const user = await User.findOne({ _id: req.user.id });
        let comment = req.body;
        if (comment.text.length > 10) {
          comment.postedBy = user;
          res.redirect(`/detail/${req.params.id}`);
          await Food.findByIdAndUpdate(
            {
              _id: req.params.id,
            },
            {
              $push: { comment: comment },
            },
            { new: true }
          );
        } else {
          const data = "Bình luận chưa đủ 10 chữ cái!";
          res.render("foodDetail", { data: food, alert: data });
        }
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err.message);
      res.render("404");
    }
  }

  static showErrorPage(req: any, res: any) {
    try {
      res.render("404");
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default HomeController;
