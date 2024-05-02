import express from "express";
import {
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePasswoard,
  postChangePasswoard,
} from "../controllers/userController";
import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePasswoard)
  .post(postChangePasswoard);
userRouter.get("/:id", see);

export default userRouter;
