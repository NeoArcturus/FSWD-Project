const sql = require("../database");

const getData = (email, res) => {
  sql.query(
    "SELECT * FROM users WHERE email='" + email + "'",
    (error, result) => {
      if (error)
        res
          .status(500)
          .send({ message: "Something went wrong!", error: error });
      else if (result.length === 0)
        res.status(404).send({ message: "User not found!" });
      else res.status(200).send({ data: result[0] });
    }
  );
};

const dataForAdmin = (res) => {
  sql.query("SELECT * FROM users", (error, result) => {
    if (error)
      res.status(500).send({ message: "Something went wrong!", error: error });
    else if (result.length === 0)
      res.status(404).send({ message: "Data does not exist!" });
    else res.status(200).send({ data: result });
  });
};

module.exports = { getData, dataForAdmin };
