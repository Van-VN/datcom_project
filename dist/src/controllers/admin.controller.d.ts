declare class AdminController {
    static showAdminPage(req: any, res: any): Promise<void>;
    static showCreateUser(req: any, res: any): Promise<void>;
    static getCreatePage(req: any, res: any): Promise<void>;
    static createFood(req: any, res: any): Promise<void>;
    static showFoodList(req: any, res: any): Promise<void>;
    static showUpdateFood(req: any, res: any): Promise<void>;
    static updateFood(req: any, res: any): Promise<void>;
    static deleteFood(req: any, res: any): Promise<void>;
}
export default AdminController;
