const { body } = require("express-validator");

exports.signupValidator = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("username should be at least 3 characters")
    .not()
    .isEmpty()
    .withMessage("username cannot be empty"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("please enter a valid email")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 3 })
    .withMessage("password should be at least 3 characters")
    .not()
    .isEmpty(),
];

exports.signinValidator = [
  body("emailUsername")
    .trim()
    .not()
    .isEmpty()
    .withMessage("please enter a valid email or username"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password should not be empty"),
];

exports.createChatVal = [
  body("chatTitle")
    .trim()
    .not()
    .isEmpty()
    .withMessage("chatTitle cannot be empty")
    .isLength({ min: 1 })
    .withMessage("chatTitle should be a minimum of 1 character"),
];

exports.chatMessageVal = [
  body("chatMessage")
    .trim()
    .not()
    .isEmpty()
    .withMessage("chatMessage cannot be empty")
    .isLength({ min: 1 })
    .withMessage("chatMessage should be a minimum of 1 character"),
];
