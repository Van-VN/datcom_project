
class HomeController {
    static async getHomePage(req: any, res: any) {
        try {
            return res.render('home')
        } catch (err) {
            console.log(err)
        }
    }
}

export default HomeController;