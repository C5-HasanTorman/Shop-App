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

module.exports = { addNewProduct };
