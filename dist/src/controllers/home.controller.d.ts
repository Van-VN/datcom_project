declare class HomeController {
    static getHomePage(req: any, res: any): Promise<any>;
    static getCreatePage(req: any, res: any): Promise<void>;
    static createFood(req: any, res: any): Promise<void>;
}
export default HomeController;
