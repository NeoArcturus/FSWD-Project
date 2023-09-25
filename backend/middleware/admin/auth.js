const sql = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("../../middleware/jwtToken");

const newAdmin = (data, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (!err)
      bcrypt.hash(data.password, salt, (er, hash) => {
        if (!er) {
          sql.query(
            "INSERT INTO admin VALUES '" +
              data.username +
              "', '" +
              data.password +
              "'",
            (error, result) => {
              if (error) {
                res.status(500);
                res.send({ message: "Something went wrong!", error: error });
              } else res.status(200).json({ message: "New Admin Added" });
            }
          );
        }
      });
  });
};

const login = (data, res) => {
  sql.query(
    "SELECT * FROM admin WHERE username='" + data.username + "'",
    (error, result) => {
      if (error) {
        res.status(511);
        res.send({ message: "User not found" });
      } else {
        bcrypt.compare(data.password, result[0].password, (error, rst) => {
          if (error) {
            res.status(500);
            res.send({ message: "Error reading password" });
          } else {
            const token = jwt.generateToken(result[0]);
            if (rst === true) {
              res.status(200);
              res.send({ message: "User Authenticated", token: token });
            } else {
              res.status(401);
              res.send({ message: "Invalid password!" });
            }
          }
        });
      }
    }
  );
};

module.exports = { newAdmin, login };
