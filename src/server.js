import express from "express";

const PORT = 4000;

const app = express();

const gossipMiddleware = (req, res, next) => {
  console.log(`Someone is going to: ${req.url}`);
  // return res.send("I have the power now!");
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};
app.get("/", gossipMiddleware, handleHome);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://loaclhost:${PORT} 🔥`);
app.listen(PORT, handleListening);
