import express from "express";
import {Router} from "express"
import passport from "../middlewares/home.middlewares";

const router = Router()
import HomeController from "../controllers/home.controller";
import ProfileUserController from "../controllers/profileUser.controller";
import {ProductController} from "../controllers/product.controller";
import {AdminController} from "../controllers/admin.controller";
import {CartController} from "../controllers/cart.controller";
import {UserController} from "../controllers/user.controller";
import DiscountController from "../controllers/discount.controller";

router.get('/', HomeController.getHomePage)
router.get('/ProfileUser', ensureAuthenticated, ProfileUserController.getManagerUserPage)

router.get('/login', HomeController.getLoginPage);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/register', HomeController.getRegisterPage)
router.post('/register', HomeController.postRegisterPage)

router.get('/product', ProductController.productDetail);

router.get('/search', ProductController.searchProducts);

router.get('/new-product', ensureAuthenticated, AdminController.newProduct);
router.post('/new-product', ensureAuthenticated, AdminController.createProduct)

router.get('/new-category', ensureAuthenticated, AdminController.newCategory)
router.post('/new-category', ensureAuthenticated, AdminController.createCategory)

router.get('/list-product', ensureAuthenticated, AdminController.showProducts)
router.get('/list-category', ensureAuthenticated, AdminController.showCategories)

router.post('/add-to-cart', CartController.addProductToCart);
router.get('/cart', CartController.getCartPage);
router.post('/delete-product-cart', CartController.deleteProductCart);
router.get('/new-discount', ensureAuthenticated, DiscountController.getDiscount);
router.post('/new-discount', ensureAuthenticated, DiscountController.createDiscount);
router.get('/list-discount', ensureAuthenticated, DiscountController.getListDiscount);
router.post('/check-discount-code', DiscountController.checkDisCountCode);


router.get('/me-profile',  UserController.getEditUsers);
router.post('/me-profile', UserController.postEditUsers);
router.get('/me-change-password', UserController.getChangePassword);
router.post('/me-change-password', UserController.postChangePassword);
router.get('/deleteProduct/:id', AdminController.deleteProduct);

router.get('/editProduct/:id', AdminController.showEditProduct);
router.post('/editProduct/:id', AdminController.editProduct);

router.get('/deleteCategory/:id', AdminController.deleteCategory);
router.get('/editCategory/:id', AdminController.showEditCategory);
router.post('/editCategory/:id', AdminController.editCategory);



router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get(
    "/google/callback",
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/');
    }
);

// Đăng nhập bằng Facebook
router.get('/auth/facebook', passport.authenticate('facebook'));

// Xử lý callback sau khi đăng nhập thành công
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'})
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('*', function (req, res) {
    res.render('notfound')
});
export default router