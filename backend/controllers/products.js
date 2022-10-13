const connection = require("../models/db");

//Add new Product

const addNewProduct = (req, res) => {
  const { title, description, img, price } = req.body;
  const owner_id = req.token.userId;
  const query = `INSERT INTO Products (title, description, img, price,owner_id ) VALUES (?,?,?,?,?);`;
  const data = [title, description, img, price, owner_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "Product uploaded",
      result: result,
    });
  });
};

// get all Products

const getAllProduct = (req, res) => {
  const query = `SELECT * FROM Products WHERE is_deleted=0;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the items",
      result: result,
    });
  });
};

//get product by id

const getProductById = (req, res) => {
  const products_id = req.params.id;

  const query = `SELECT * FROM products WHERE id=? AND is_deleted=0;`;
  const data = [products_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "The product is Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      massage: `product NO. ${products_id}`,
      result,
    });
  });
};

module.exports = { addNewProduct, getAllProduct, getProductById };
