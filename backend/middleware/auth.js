const sql = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("./jwtToken");

const register = (data, res) => {
  bcrypt.genSalt(10, (error, salt) => {
    if (!error)
      bcrypt.hash(data.password, salt, (err, hash) => {
        if (!err) {
          sql.query(
            "INSERT INTO users VALUES('" +
              data.name +
              "', '" +
              data.username +
              "', '" +
              hash +
              "', '" +
              data.profile +
              "', '" +
              data.id +
              "')",
            (error, result) => {
              if (error) {
                res.status(500);
                res.send({ message: "Error in registration", error: error });
              } else {
                res.status(200);
                res.send({
                  message: "User registered",
                  result: result,
                });
              }
            }
          );
        }
      });
  });
};

const login = (data, res) => {
  sql.query(
    "SELECT * FROM users WHERE id='" + data.id + "'",
    (error, result) => {
      if (error)
        res.status(500).send({ message: "Something went wrong", error: error });
      else if (result.length === 0) {
        res.status(404);
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

const googleLogin = (username, res) => {
  sql.query(
    "SELECT * FROM users WHERE username='" + username + "'",
    (error, result) => {
      if (error)
        res.status(500).send({ message: "Something went wrong", error: error });
      else res.status(200).send({ message: "User authenticated" });
    }
  );
};

module.exports = { register, login, googleLogin };
