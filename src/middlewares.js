export const localsMiddleware = (req, res, next) => {
  const { loggedIn, user } = req.session;
  res.locals.loggedIn = Boolean(loggedIn);
  res.locals.siteName = "Vanilla Fullstack";
  res.locals.loggedInUser = user;
  next();
};
