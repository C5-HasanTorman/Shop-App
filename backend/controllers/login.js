const connection = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = "SELECT * from users WHERE email= ?";
  const data = [email];

  connection.query(query, data, async (err, result) => {
    try {
      if (result.length) {
        // compare password
        console.log(result ,"result");
        const match = await bcrypt.compare(password, result[0].password);
        console.log(match ,"match");

        if (!match) {
          return res.status(403).json({
            success: false,
            massage: "Wrong password!!",
          });
        }
        // create token
        const payload = {
          userId: result[0].id,
          firstName: result[0].firstName,
        };
        const SECRET = process.env.SECRET;

        const token = jwt.sign(payload, SECRET);
        return res.status(200).json({
          success: true,
          userId: result[0].id,
          token,
        });
      } else {
        res.status(404).json({
          message: "The email doesn't exist",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
  });
};

module.exports = {
  login,
};
