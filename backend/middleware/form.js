const sql = require("../database");
const jwt = require("./jwtToken");

const putFormData = (data, res) => {
  if (data === undefined || data === null || data === "") {
    res.status(401);
    res.send({ message: "Invalid form data!" });
  } else {
    const encryptedData = jwt.generateToken(data);
    sql.query(
      "INSERT INTO application VALUES ('" +
        data.id +
        "', '" +
        encryptedData +
        "')",
      (error, result) => {
        if (error) {
          res.status(500);
          res.send({ message: "Something went wrong", error: error });
        } else {
          res.status(200);
          res.send({ message: "Data received!" });
        }
      }
    );
  }
};

const retrieveFormData = (id, res) => {
  if (id === null || id === undefined || id === "") res.send(404);
  else {
    sql.query(
      "SELECT * FROM application WHERE id='" + id + "'",
      (error, result) => {
        if (error) {
          res.status(500);
          res.send({ error: error });
        } else {
          res.status(200);
          res.send(jwt.validateToken(result[0].formData));
        }
      }
    );
  }
};

module.exports = { putFormData, retrieveFormData };
