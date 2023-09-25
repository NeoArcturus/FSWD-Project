const express = require("express");
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

router.post("/googleSignIn", async (req, res) => {
  if (
    req.body.username === undefined ||
    req.body.username === null ||
    req.body.username === ""
  ) {
    res.status(401).send({ message: "Invalid username" });
  } else auth.googleLogin(req.body.username, res);
});

module.exports = router;
