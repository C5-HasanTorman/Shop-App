const express = require("express");
const { addNewProduct, getAllProduct } = require("../controllers/products");
const auth = require("../middleware/authentication");

const productsRouter = express.Router();

productsRouter.post("/", auth, addNewProduct);
productsRouter.get("/", getAllProduct);

module.exports = productsRouter;
