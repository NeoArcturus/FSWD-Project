const express = require("express");
const jwt = require("../../middleware/jwtToken");
const formControl = require("../../middleware/form");

const router = express.Router();

router.post("/formController", async (req, res) => {
  const token = req.header(process.env.SECRET_TOKEN_HEADER);
  if (!token || !jwt.validateToken(token))
    res.status(401).send({ message: "Invalid Token" });
  else {
    jwt.validateToken(token);
    formControl.putFormData(req.body, res);
  }
});

router.post("/formData", async (req, res) => {
  const token = req.header(process.env.SECRET_TOKEN_HEADER);
  if (!token || !jwt.validateToken(token))
    res.status(401).send({ message: "Invalid Token" });
  else formControl.retrieveFormData(req.body.email, res);
});

module.exports = router;
