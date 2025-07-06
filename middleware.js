const listing = require("./models/listing.js");
const Review = require("./models/reviews.js"); // import your Review model

const ExpressError = require("./utils/ExpressError.js");

const { listingSchema, reviewSchema } = require("./schema.js");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //checks whether user is signed in or not
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Log-In First!");
    return res.redirect("/user/login");
  }
  next();
};

const redirectUrl = (req, res, next) => {
  //helps in enabling the access of URL globally
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

/*validators*/

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const isOwner = async (req, res, next) => {
  //checks whether the current user is owner of listing or not
  let { id } = req.params;

  let currlisting = await listing.findById(id);

  if (req.user && !currlisting.owner.equals(req.user._id)) {
    req.flash("error", "You Don't have Permission");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

const isAuthor = async (req, res, next) => {
  //  checks whether the review is owned by current user or not
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review does not exist!");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You cannot delete other's review!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports = {
  isLoggedIn,
  redirectUrl,
  isOwner,
  isAuthor,
  validateListing,
  validateReview,
};
