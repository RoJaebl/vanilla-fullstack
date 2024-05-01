export const localsMiddleware = (req, res, next) => {
  const { loggedIn, user } = req.session;
  res.locals.loggedIn = Boolean(loggedIn);
  res.locals.siteName = "Vanilla Fullstack";
  res.locals.loggedInUser = user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
