const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
  return token;
};

const validateToken = (token) => {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return verified;
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = { generateToken, validateToken };
