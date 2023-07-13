declare class UserController {
    static showLoginForm(req: any, res: any): Promise<void>;
    static getUserInfo(req: any, res: any): void;
    static showUserPage(req: any, res: any): Promise<void>;
    static showCart(req: any, res: any): void;
    static checkLogged(req: any, res: any): void;
    static showEditPassword(req: any, res: any): void;
    static updateUserPassword(req: any, res: any): Promise<void>;
}
export default UserController;
