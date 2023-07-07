declare class UserController {
    static showLoginForm(req: any, res: any): Promise<void>;
    static getUserInfo(req: any, res: any): void;
    static showUserPage(req: any, res: any): void;
    static showCart(req: any, res: any): void;
}
export default UserController;
