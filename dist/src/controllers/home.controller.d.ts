declare class HomeController {
    static getHomePage(req: any, res: any): Promise<any>;
    static showErrorPage(req: any, res: any): void;
}
export default HomeController;
