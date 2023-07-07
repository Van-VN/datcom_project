import Food from "../models/schemas/food.model";
import {Order} from "../models/schemas/order.model";

class OrderController {
    static async addToCart(req: any, res: any) {
        try {
            let foodId = req.body.id;
            let food = await Food.findOne({_id: foodId});
            console.log(food);
            if (food && food.status){
                let order = new Order()
                order.foods.push({ food: req.body.foodId, quantity: 1 , imgUrl: food.imageUrl});
                order.createAt = new Date();
                if(await order.save()){
                    res.send('ok')
                } else {
                    res.send('not ok')
                }
            } else {
                res.send('not ok')
            }
        } catch (err) {
            console.log(err.message);
        }
    }

}

export default OrderController;
