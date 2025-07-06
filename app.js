if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const dbURL = process.env.ATLASDB_URL;

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //to connnect to mongo for storing session details
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
let store = MongoStore.create({
  mongoUrl: dbURL, //the data base which is used
  crypto: {
    secret: process.env.SECRET,
  },

  touchAfter: 24 * 3600, // time after which login credentials has to be re-enter
});
store.on("error", (err) => {
  console.log("error in mongo session store", err);
});
let sessionObj = {
  store,
  secret: process.env.SECRET,

  resave: false,
  saveUninitialized: true,

  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //this will make it expire after 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("connected to mongoose...");
  })
  .catch(() => {
    console.log("connection to mongoose fail...");
  });

async function main() {
  await mongoose.connect(dbURL);
}

// app.get("/", (req, res) => {
//   res.send("connected to root");
// });

app.use(session(sessionObj));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); //this will make passport to see or track what session is currently used and will make it initialize only ones of each session

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // to store user info in session
passport.deserializeUser(User.deserializeUser()); //to remove user info in session

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; //this will pass user info to curruser for ejs files
  next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/review", reviewsRouter);
app.use("/user", userRouter);

/*path error handling*/

app.use((req, res, next) => {
  res.status(404).render("routeerror.ejs");
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Let Express handle the error
  }

  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("server started...");
});
