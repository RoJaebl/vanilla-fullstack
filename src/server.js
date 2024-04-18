import express from "express";
import morgan from "morgan";
import global from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.use(logger);
app.use("/", global);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://loaclhost:${PORT} 🔥`);
app.listen(PORT, handleListening);
