import express from "express";
import morgan from "morgan";
import session from "express-session";
import root from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import rootRouter from "./routers/rootRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  req.sessionStore.all((err, sesstions) => {
    console.log(sesstions);
    next();
  });
});

app.get("/add-one", (req, res, next) => {
  req.session.counter += 1;
  console.log(req.sessionStore);
  console.log(req.session);
  return res.send(`${req.session.id}\n${req.session.counter}`);
});
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
