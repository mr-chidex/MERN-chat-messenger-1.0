const expressPromise = require("express-promise-router");
const router = expressPromise();

const { signin, signup } = require("../controllers/users");
const {
  signupValidator,
  signinValidator,
} = require("../middlewares/validation");

router.route("/signin").post(signinValidator, signin);
router.route("/signup").post(signupValidator, signup);

module.exports = router;
