const express = require("express");
const { addNewProduct } = require("../controllers/products");
const auth = require("../middleware/authentication");

const productsRouter = express.Router();

productsRouter.post("/", auth, addNewProduct);

module.exports = productsRouter;
