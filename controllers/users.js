const User = require("../models/user.js");

const SignUppage = (req, res) => {
  res.render("listings/signup.ejs");
};

const SignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registereduser = await User.register(newUser, password);
    req.login(registereduser, (err) => {
      //this enable auto login after signup
      if (err) {
        return next(err);
      }
      req.flash("success", "Account created successfully !");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/user/signup");
  }
};

const LogInpage = (req, res) => {
  res.render("listings/login.ejs");
};

const LogIn = (req, res) => {
  req.flash("success", "welcome to wanderlust");
  if (res.locals.redirectUrl) {
    res.redirect(res.locals.redirectUrl);
  } else {
    res.redirect("/listings");
  }
};

const LogOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you logged out successfully!");
    res.redirect("/listings");
  });
};

module.exports = { SignUppage, SignUp, LogInpage, LogIn, LogOut };
