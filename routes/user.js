const express = require("express");
const router = express.Router();

const asyncWrap = require("../utils/asyncWrap.js");
const passport = require("passport");
const { redirectUrl } = require("../middleware.js");
const {
  SignUppage,
  SignUp,
  LogInpage,
  LogIn,
  LogOut,
} = require("../controllers/users.js");

/*Sign Up*/
router.route("/signup").get(SignUppage).post(asyncWrap(SignUp));

/*Log In*/
router
  .route("/login")
  .get(LogInpage)
  .post(
    redirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: true,
    }),
    asyncWrap(LogIn)
  );

/*Log Out*/
router.get("/logout", LogOut);

module.exports = router;
