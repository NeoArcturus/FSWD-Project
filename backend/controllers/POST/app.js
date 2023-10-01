const express = require("express");
const app = require("../../middleware/app");
const jwt = require("../../middleware/jwtToken");

const router = express.Router();

router.post("/userData", async (req, res) => {
  const token = req.headers(process.env.SECRET_TOKEN_HEADER);
  if (!jwt.validateToken(token))
    res.status(401).send({ message: "User not authenticated!" });
  else {
    if (
      req.body.email === undefined ||
      req.body.email === null ||
      req.body.email === ""
    )
      res.status(500).send({ message: "Invalid data!" });
    else app.getData(req.body.email, res);
  }
});

module.exports = router;
