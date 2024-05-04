import multer from "multer";

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

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 1_000_000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10_000_000,
  },
});
