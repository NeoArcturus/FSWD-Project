const sql = require("../database");
const jwt = require("./jwtToken");

const putFormData = (data, res) => {
  if (data === undefined || data === null || data === "") {
    res.status(401);
    res.send({ message: "Invalid form data!" });
  } else {
    const encryptedData = jwt.generateToken(data.body);
    sql.query(
      "INSERT INTO application VALUES ('" +
        encryptedData +
        "', '" +
        data.email +
        "', 'Reviewing')",
      (error, result) => {
        if (error) {
          res.status(500);
          res.send({ message: "Something went wrong", error: error });
        } else {
          res.status(200);
          res.send({ message: "Data received!", result: result });
        }
      }
    );
  }
};

const retrieveFormData = (email, res) => {
  if (email === null || email === undefined || email === "") res.send(404);
  else {
    sql.query(
      "SELECT * FROM application WHERE email='" + email + "'",
      (error, result) => {
        if (error) {
          res.status(500);
          res.send({ error: error });
        } else if (result.length === 0) {
          res.status(404).send({ message: "Data not found!" });
        } else {
          res.status(200);
          res.send({ data: result[0] });
        }
      }
    );
  }
};

const withDraw = (email, res) => {
  if (email === null || email === undefined || email === "") res.send(404);
  else {
    sql.query(
      "DELETE FROM application WHERE email='" + email + "'",
      (error, result) => {
        if (error) {
          res.status(500);
          res.send({ error: error });
        } else {
          res.status(200);
          res.send({ data: result });
        }
      }
    );
  }
};

module.exports = { putFormData, retrieveFormData, withDraw };
