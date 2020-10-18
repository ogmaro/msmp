const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const key = process.env.KEY;

const access = {};
access.signInToken = (emailAddress) => {
  const options = {
    expiresIn: "1hr",
    issuer: "ogmaro",
    audience: emailAddress,
  };
  return jwt.sign(
    {
      emailAddress: emailAddress,
    },
    key,
    options
  );
};
access.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, key);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Authorization failed",
    });
  }
};

module.exports = access;
