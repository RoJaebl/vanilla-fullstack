import express from "express";
import morgan from "morgan";
import router from "./routers/router";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

app.use("/", router.global);
app.use("/videos", router.video);
app.use("/users", router.user);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://loaclhost:${PORT} 🔥`);
app.listen(PORT, handleListening);
