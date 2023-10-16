const express = require("express");
const applicant = require("./form");

const router = express.Router();

router.use("/form", applicant);

module.exports = router;
