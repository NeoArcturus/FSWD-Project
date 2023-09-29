const express = require("express");
const auth = require("../../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  if (req.body.email === undefined || req.body.email === null || req.body.email === "") {
    res.status(401);
    res.send({ message: "Invalid data!" });
  } else auth.register(req.body, res);
});

router.post("/login", async (req, res) => {
  if (req.body.email === undefined || req.body.email === null || req.body.email === "") {
    res.status(401);
    res.send({ message: "Invalid data!" });
  } else auth.login(req.body, res);
});

router.post("/googleSignIn", async (req, res) => {
  if (
    req.body.email === undefined ||
    req.body.email === null ||
    req.body.email === ""
  ) {
    res.status(401).send({ message: "Invalid username" });
  } else auth.googleLogin(req.body.email, res);
});

router.post("/googleSignUp", async (req, res) => {
  if (
    req.body.data.email === undefined ||
    req.body.data.email === null ||
    req.body.data.email === ""
  ) {
    res.status(401).send({ message: "Invalid username" });
  } else auth.googleSignUp(req.body.data, res);
});

module.exports = router;
