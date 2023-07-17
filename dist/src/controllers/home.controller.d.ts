declare class HomeController {
    static getHomePage(req: any, res: any): Promise<any>;
    static showFoodDetail(req: any, res: any): Promise<void>;
    static foodComment(req: any, res: any): Promise<void>;
    static deleteComment(req: any, res: any): Promise<void>;
    static showErrorPage(req: any, res: any): void;
    static searchFood(req: any, res: any): Promise<any>;
    static meatSort(req: any, res: any): Promise<any>;
    static vegSort(req: any, res: any): Promise<any>;
    static allSort(req: any, res: any): Promise<any>;
    static exportExcel(req: any, res: any): Promise<void>;
}
export default HomeController;
