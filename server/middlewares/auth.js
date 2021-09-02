const JWT = require("jsonwebtoken");

const User = require("../models/users");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).json({ message: "Access denied" });

    if (!req.headers.authorization.startsWith("Bearer"))
      return res.status(400).json({ message: "invalid token format" });

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Access denied" });

    const decodedToken = JWT.verify(token, process.env.SECRET_KEY);

    if (!decodedToken)
      return res.status(403).json({ message: "Access denied" });

    if (Date.now() >= decodedToken.exp * 1000)
      return res.status(400).json({ message: "Token expired" });

    // console.log(decodedToken);
    // console.log(decodedToken.exp * 1000);

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) return res.status(403).json({ message: "Access denied" });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
