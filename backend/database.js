const mysql = require("mysql2");

const dbConn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Password",
  database: "fswd",
});

dbConn.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected to database fswd!");
});

module.exports = dbConn;
