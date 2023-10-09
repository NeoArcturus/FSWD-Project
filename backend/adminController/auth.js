const express = require("express");
const adminAuth = require("../middleware/admin/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  if (req.body.username === undefined || req.body.username === null || req.body.username === "") {
    res.status(401);
    res.send({ message: "Invalid data!" });
  } else adminAuth.login(req.body, res);
});

module.exports = router;
