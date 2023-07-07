const checkAdmin = function (req: any, res: any, next: any) {
  if (req.user.role === "Admin") {
    next();
  } else {
    res.render("404");
  }
};

export default checkAdmin;
