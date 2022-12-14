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
      userId: owner_id,
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

// update product By Id
const updateProductById = (req, res) => {
  const products_id = req.params.id;
  const owner_id = req.token.userId;
  const { title, price, description, img } = req.body;
  const query = `SELECT * FROM products WHERE id=? AND is_deleted=0`;

  const data = [products_id, owner_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err.message,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "product is Not Found",
      });
    }
    const query = `UPDATE products SET title=?, price=?, description =? ,img=? WHERE id=?`;
    const data = [
      title || result[0].title,
      price || result[0].price,
      description || result[0].description,
      img || result[0].img,
      products_id,
    ];

    connection.query(query, data, (err, response) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "server error*",
          err: err,
        });
      }
      if (response.affectedRows) {
        res.status(201).json({
          success: true,
          massage: `The product updated successfuly`,
          response,
        });
      }
    });
  });
};

// delete Product
const deleteProduct = (req, res) => {
  const Product_id = req.params.id;
  const owner_id = req.token.userId;

  const query = `SELECT * FROM Products WHERE id=? AND is_deleted=0`;

  const data = [Product_id, owner_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err.message,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "Product is Not Found",
      });
    }
    const query = `UPDATE Products SET is_deleted=1 WHERE id=?`;
    const data = [Product_id];

    connection.query(query, data, (err, response) => {
      res.status(200).json({
        success: true,
        massage: `Succeeded to delete Product with id: ${Product_id}`,
        response,
      });
    });
  });
};

module.exports = {
  addNewProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProduct,
};
