const checkUrl = function (req: any, res: any, next: any) {
  const regex = /^[a-z0-9]{24}$/;
  const check = regex.test(req.params.id);
  if (check) {
    next();
  } else {
    res.redirect("/404");
  }
};

export default checkUrl;
