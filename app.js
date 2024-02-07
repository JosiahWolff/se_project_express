const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "65c1398dc1817900d0bffa05",
  };
  next();
});

const routes = require("./routes");

app.use(express.json());

app.use(helmet);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
