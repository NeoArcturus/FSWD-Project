const express = require("express");

const app = require("../../controllers/POST/app");

const router = express.Router();
router.post("/user", app);

module.exports = router;
