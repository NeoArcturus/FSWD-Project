const sql = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("../../middleware/jwtToken");

const login = (data, res) => {
  sql.query(
    "SELECT * FROM admin WHERE username='" + data.username + "'",
    (error, result) => {
      if (error) {
        res.status(404);
        res.send({ message: "Admin not found" });
      } else {
        bcrypt.compare(data.password, result[0].password, (error, rst) => {
          if (error) {
            res.status(500);
            res.send({ message: "Error reading password" });
          } else {
            const token = jwt.generateToken(result[0]);
            if (rst === true) {
              res.status(200);
              res.send({ message: "Admin Authenticated", token: token });
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

module.exports = { login };
