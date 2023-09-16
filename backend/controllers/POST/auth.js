const express = require("express");
const jwt = require("../../middleware/jwtToken");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  if (req.body.id === undefined || req.body.id === null || req.body.id === "") {
    res.status(401);
    res.send({ message: "Invalid data!" });
  } else auth.register(req.body, res);
});

router.post("/login", async (req, res) => {
  if (req.body.id === undefined || req.body.id === null || req.body.id === "") {
    res.status(401);
    res.send({ message: "Invalid data!" });
  } else auth.login(req.body, res);
});

module.exports = router;
