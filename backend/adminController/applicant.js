const express = require("express");
const jwt = require("../middleware/jwtToken");
const applicant = require("../middleware/admin/app");

const router = express.Router();

router.post("/selectApplicant", async (req, res) => {
  const token = req.header(process.env.SECRET_TOKEN_HEADER);
  if (!jwt.validateToken(token))
    res.status(401).send({ message: "User not authenticated!" });
  else applicant.selectTeam(req.body.id, req.body.email, res);
});

router.post("/rejectApplicant", async (req, res) => {
  const token = req.header(process.env.SECRET_TOKEN_HEADER);
  if (!jwt.validateToken(token))
    res.status(401).send({ message: "User not authenticated!" });
  else applicant.rejectTeam(req.body.id, req.body.email, res);
});

router.post("/deleteApplication", async (req, res) => {
  const token = req.header(process.env.SECRET_TOKEN_HEADER);
  if (!jwt.validateToken(token))
    res.status(401).send({ message: "User not authenticated!" });
  else applicant.deleteApplication(req.body.id, res);
});

module.exports = router;
