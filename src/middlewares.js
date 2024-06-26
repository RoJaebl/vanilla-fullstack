import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isProduction = process.env.NODE_ENV === "production";

const s3ImageUploader = multers3({
  s3,
  bucket: "rojaebl-vanilla-fullstack/images",
  acl: "public-read",
});

const s3VideoUploader = multers3({
  s3,
  bucket: "rojaebl-vanilla-fullstack/videos",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
  const { loggedIn, user } = req.session;
  res.locals.loggedIn = Boolean(loggedIn);
  res.locals.siteName = "Vanilla Fullstack";
  res.locals.loggedInUser = user || {};
  res.locals.isProduction = isProduction;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 1_000_000,
  },
  storage: isProduction ? s3ImageUploader : undefined,
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10_000_000,
  },
  storage: isProduction ? s3VideoUploader : undefined,
});
