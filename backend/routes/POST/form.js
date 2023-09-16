const express = require("express");
const jwt = require("../../middleware/jwtToken");
const formControl = require("../../middleware/form");

const router = express.Router();

router.post("/formController", async (req, res) => {
  const token = req.header(process.env.TOKEN_HEADER_KEY);
  if (!token) res.status(401).send({ message: "Invalid Token" });
  else {
    jwt.validateToken(token);
    formControl.putFormData(req.body, res);
  }
});

router.post("/formData", async (req, res) => {
  const token = req.header(process.env.TOKEN_HEADER_KEY);
  if (!token) res.status(401).send({ message: "Invalid Token" });
  else formControl.retrieveFormData(req.body.id, res);
});

module.exports = router;
