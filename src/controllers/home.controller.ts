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
}

export default HomeController;
