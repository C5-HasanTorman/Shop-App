const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

// require routers
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const productsRouter = require("./routes/products");
const commentRouter = require("./routes/comments");
const favoriteRouter = require("./routes/favourite");

//built-in middleware
app.use(cors());
app.use(express.json());

// middlewares
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);
app.use("/comments", commentRouter);
app.use("/favorite", favoriteRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
