const connection = require("../models/db");

// create New Comment
const createNewComment = (req, res) => {
  const Product_id = req.params.id;
  console.log(Product_id, ":product_id");
  const commenter_id = req.token.userId;

  const { comment } = req.body;
  const query = `INSERT INTO comments (comment, commenter_id, Product_id) VALUES (?,?,?)`;
  const data = [comment, commenter_id, Product_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new comment",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "The comment has been created success ",
      result: result,
    });
  });
};


//get comment by product id

const getCommentByProductId = (req, res) => {
  const product_id = req.params.id;
  const query = `SELECT * FROM comments WHERE product_id=?`;
  const data = [product_id];

  connection.query(query, data, (err, result) => {
    console.log(result, "result");

    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "product Not found",
      });
    }
    return res.status(200).json({
      success: true,
      massage: `Get All comment on product No. ${product_id}`,
      result,
    });
  });
};

module.exports = {
  createNewComment,
  getCommentByProductId,
};
