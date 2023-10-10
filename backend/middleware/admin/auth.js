const sql = require("../../database");
const jwt = require("../../middleware/jwtToken");

const login = (data, res) => {
  sql.query(
    "SELECT * FROM admin WHERE username='" + data.username + "'",
    (error, result) => {
      if (error) {
        res.status(500);
        res.send({ message: "Something went wrong", error: error });
      } else {
        if (result.length === 0)
          res.status(404).send({ message: "Admin not found!" });
        const token = jwt.generateToken(result[0]);
        if (data.password === result[0].password) {
          res.status(200);
          res.send({ message: "Admin Authenticated", token: token });
        } else {
          res.status(401);
          res.send({ message: "Invalid password!" });
        }
      }
    }
  );
};

module.exports = { login };
