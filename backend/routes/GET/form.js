const express = require("express");
const jwt = require("../../middleware/jwtToken");
const formControl = require("../../middleware/form");

const router = express.Router();

router.get("/applicant", async (req, res) => {
  const token = req.header(process.env.SECRET_TOKEN_HEADER);
  if (!token || !jwt.validateToken(token))
    res.status(401).send({ message: "Invalid Token" });
  else {
    jwt.validateToken(token);
    formControl.getAll(res);
  }
});

module.exports = router;
