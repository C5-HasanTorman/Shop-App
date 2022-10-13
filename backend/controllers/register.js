const connection = require("../models/db");
const bcrybt = require("bcrypt");
const salt = 10;

const register = async (req, res) => {
  const { firstName, lastName, country, email, password } = req.body;

  //   password hash :
  const hashPassword = await bcrybt.hash(password, salt);

  const data = [firstName, lastName, country, email, hashPassword];

  const query = "SELECT email FROM users WHERE email = ?";

  connection.query(query, data[3], (err, result) => {
    if (result.length) {
      console.log(result);

      return res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    } else {
      const query =
        "INSERT INTO users (firstName, lastName, country, email, password) VALUES (?,?,?,?,?) ";
      connection.query(query, data, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "server error",
            err: err,
          });
        } else {
          res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            result,
          });
        }
      });
    }
  });
};

module.exports = { register };
