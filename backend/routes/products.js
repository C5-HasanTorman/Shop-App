const express = require("express");
const {
  addNewProduct,
  getAllProduct,
  getProductById,
  updateProductById,
} = require("../controllers/products");
const auth = require("../middleware/authentication");

const productsRouter = express.Router();

productsRouter.post("/", auth, addNewProduct);
productsRouter.get("/", getAllProduct);
productsRouter.get("/:id", getProductById);
productsRouter.put("/:id", auth,updateProductById);

module.exports = productsRouter;
