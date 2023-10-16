const sql = require("../database");
const jwt = require("./jwtToken");
const crypto = require("crypto");

const putFormData = (data, res) => {
  if (data === undefined || data === null || data === "") {
    res.status(401);
    res.send({ message: "Invalid form data!" });
  } else {
    const encryptedData = jwt.generateToken(data.body);
    const id = crypto.randomUUID();
    sql.query(
      "INSERT INTO application VALUES ('" +
        encryptedData +
        "', 'Reviewing', '" +
        id +
        "', '" +
        data.email +
        "')",
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
  if (email === null || email === undefined || email === "")
    res.sendStatus(404);
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
      "UPDATE application SET status='Withdrawn' WHERE email='" + email + "'",
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

const getAll = (res) => {
  sql.query("SELECT * FROM application", (error, result) => {
    if (error) {
      res.status(500);
      res.send({ error: error });
    } else if (result.length === 0) {
      res.status(404).send({ message: "Data not found!" });
    } else {
      res.status(200);
      const formData = [];
      const id = [];
      const email = [];
      const status = [];
      for (let i = 0; i < result.length; i++) {
        formData[i] = jwt.validateToken(result[i].formData);
        id[i] = result[i].id;
        email[i] = result[i].email;
        status[i] = result[i].status;
      }
      const data = [];
      for (let i = 0; i < id.length; i++) {
        data[i] = {
          ID: id[i],
          Email: email[i],
          Answers: formData[i],
          Status: status[i],
        };
      }
      res.send({ data });
    }
  });
};

module.exports = { putFormData, retrieveFormData, withDraw, getAll };
