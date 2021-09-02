const JWT = require("jsonwebtoken");

module.exports = (user) => {
  return JWT.sign(
    {
      iat: Date.now(),
      iss: "mr-chidex",
      userId: user._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};
