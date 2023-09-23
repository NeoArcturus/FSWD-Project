const express = require("express");
const jwt = require("../../middleware/jwtToken");
const sql = require("../../database");

const router = express.Router();

router.post("/profileControl", async (req, res) => {
  const token = req.header(process.env.TOKEN_HEADER_KEY);
  if (jwt.validateToken(token)) {
    const id = req.body.id;

    sql.query("SELECT * FROM users WHERE id='" + id + "'", (error, result) => {
      if (error) res.send({ message: "Something went wrong!" }).status(500);
      else if (!result[0]) res.send({ message: "User not found!" }).status(404);
      else res.send({ data: result[0] }).status(200);
    });
  } else res.send({ message: "Invalid token!" }).status(401);
});

module.exports = router;
