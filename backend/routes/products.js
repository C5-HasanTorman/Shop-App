const express = require("express");
const {
  addNewProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProduct,
} = require("../controllers/products");
const auth = require("../middleware/authentication");

const productsRouter = express.Router();

productsRouter.post("/", auth, addNewProduct);
productsRouter.get("/", getAllProduct);
productsRouter.get("/:id", getProductById);
productsRouter.put("/:id", auth, updateProductById);
productsRouter.put("/:id/remove", auth, deleteProduct);

module.exports = productsRouter;
