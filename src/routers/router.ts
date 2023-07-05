import {Router} from "express"

const router = Router()
import HomeController from "../controllers/home.controller";

router.get('/', HomeController.getHomePage)
router.get('*', function (req, res) {
    res.render('notfound')
});
export default router