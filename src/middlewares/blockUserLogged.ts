const blockUserLogged= async (req:any, res: any, next: any) => {
    let user = req.user;
    if (!user) {
        next();
    }else {
        res.redirect('/');
    }
}
export default blockUserLogged;