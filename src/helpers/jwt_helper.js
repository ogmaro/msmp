const jwt = require("jsonwebtoken");
const createError = require("http-errors");
//const client = require('./init_redis')

const access = {};
access.signInToken = (emailAddress) => {
  return jwt.sign(
    {
      emailAddress: emailAddress,
    },
    process.env.KEY,
    {
      expiresIn: "1hr",
    }
  );
};

module.exports = access;
