const cors = require("cors");

const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");

const app = express();
const { PORT = 3001 } = process.env;

const { createUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const authen = require("./middlewares/auth");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(helmet());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

app.use(authen);
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
