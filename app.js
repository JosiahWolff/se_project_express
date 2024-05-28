require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateNewUser, validateLogIn } = require("./middlewares/validation");

console.log(process.env.NODE_ENV);

const app = express();

const { PORT = 3001 } = process.env;

const { createUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const authen = require("./middlewares/auth");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

// CORS configuration
const allowedOrigins = ["https://wtwrbyjosiah3311.crabdance.com"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable sending cookies
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger);

app.post("/signin", validateLogIn, login);
app.post("/signup", validateNewUser, createUser);
app.get("/items", getItems);

app.use(authen);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
