const express = require("express");
const adminAuth = require("../../middleware/admin/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  if (req.body.id === undefined || req.body.id === null || req.body.id === "") {
    res.status(401);
    res.send({ message: "Invalid data!" });
  } else adminAuth.newAdmin(req.body, res);
});

router.post("/login", async (req, res) => {
  if (req.body.id === undefined || req.body.id === null || req.body.id === "") {
    res.status(401);
    res.send({ message: "Invalid data!" });
  } else adminAuth.login(req.body, res);
});

module.exports = router;
