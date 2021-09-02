const { validationResult } = require("express-validator");
const bcryptJs = require("bcryptjs");

const getToken = require("../utils/token");
const User = require("../models/users");

//@Route - POST /api/v1/users/signup
//@Access - Public
//@Description - add/create a new user
exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).json({ message: errors.array()[0].msg });

  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "email already in use" });

  user = await User.findOne({ username });
  if (user) return res.status(400).json({ message: "username already in use" });

  const newUser = await new User({
    email,
    password,
    username,
  });

  await newUser.save();

  res.status(201).json({ message: "user successfully signed up", newUser });
};

//@Route - POST /api/v1/users/signin
//@Access - Public
//@Description - signin user
exports.signin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).json({ message: errors.array()[0].msg });

  const { emailUsername, password } = req.body;

  //check user by email if emailUsername=email
  let user = await User.findOne({ email: emailUsername });

  //check user by username if emailUsername=username
  if (!user) {
    user = await User.findOne({ username: emailUsername });
  }

  if (!user)
    return res.status(400).json({ message: "user or password is incorrect" });

  const isMatch = await bcryptJs.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "user or password is incorrect" });

  const token = getToken(user);

  res.json({
    _id: user._id,
    email: user.email,
    username: user.username,
    token,
  });
};
