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
          await Food.findByIdAndUpdate(
            {
              _id: req.params.id,
            },
            {
              $push: { comment: comment },
            },
            { new: true }
          );
          res.redirect(`/detail/${req.params.id}`);
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

  static async deleteComment(req: any, res: any) {
    try {
      const commentId = req.params.id;
      const comment = await Food.findOne({ "comment._id": commentId });
      await comment.updateOne({ $pull: { comment: { _id: commentId } } });
      res.redirect(req.headers.referrer);
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

  static async searchFood(req: any, res: any) {
    const query = req.query.q;
    const results = await Food.find({ name: { $regex: query, $options: "i" } });
    res.json(results);
  }
}

export default HomeController;
