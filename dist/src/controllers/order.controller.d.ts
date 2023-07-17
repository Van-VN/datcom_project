declare class OrderController {
    static addToCart(req: any, res: any): Promise<any>;
    static getCartCount(req: any, res: any): Promise<void>;
    static showCart(req: any, res: any): Promise<void>;
    static deleteOrder(req: any, res: any): Promise<any>;
    static checkOut(req: any, res: any): Promise<void>;
    static UpdateCount(req: any, res: any): Promise<any>;
}
export default OrderController;
