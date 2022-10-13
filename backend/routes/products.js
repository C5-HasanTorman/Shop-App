const express = require("express");
const {
  addNewProduct,
  getAllProduct,
  getProductById,
} = require("../controllers/products");
const auth = require("../middleware/authentication");

const productsRouter = express.Router();

productsRouter.post("/", auth, addNewProduct);
productsRouter.get("/", getAllProduct);
productsRouter.get("/:id", getProductById);

module.exports = productsRouter;
