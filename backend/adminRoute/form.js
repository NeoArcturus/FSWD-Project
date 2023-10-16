const express = require("express");
const applicant = require("../adminController/applicant");

const router = express.Router();

router.use("/applicant/:id", applicant);

module.exports = router;
