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
  jwt.verify(req.body.token, key, (error, result) => {
    if (error) {
      return next(
        res.status(401).json({
          msg: createError.Unauthorized(),
        })
      );
    }
    req.payload = result;
    next();
  });
};

module.exports = access;
