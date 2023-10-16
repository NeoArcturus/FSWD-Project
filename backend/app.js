const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Dotenv = require("dotenv");
const db = require("./database");

const GET = require("./routes/GET/index.js");
const POST = require("./routes/POST/index.js");

const admin = require("./adminRoute");

const app = express();
const PORT = 8080;

Dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to (CORS)
  })
);
app.use(bodyParser.json());

app.use("/api", POST);
app.use("/get", GET);
app.use("/admin", admin);

app.listen(PORT, (error) => {
  if (!error) console.log("App is running fine on PORT 8080");
  else console.log("Error: " + error);
});
