import express from "express";
import {
  edit,
  remove,
  logout,
  see,
  startGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get(":id", see);

export default userRouter;
