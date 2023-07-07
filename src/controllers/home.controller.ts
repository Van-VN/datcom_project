import Food from "../models/schemas/food.model";

class HomeController {
  static async getHomePage(req: any, res: any) {
    try {
      const foods = await Food.find({ status: "true" });
      return res.render("home", { data: foods });
    } catch (err) {
      console.log(err);
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
