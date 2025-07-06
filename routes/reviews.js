const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncWrap.js");

const { CreateReview, DeleteReview } = require("../controllers/reviews.js");
const { isLoggedIn, isAuthor, validateReview } = require("../middleware.js");

/*review route*/
router.post("/", validateReview, isLoggedIn, asyncWrap(CreateReview));

/*review delete route*/
router.delete("/:reviewId", isLoggedIn, isAuthor, asyncWrap(DeleteReview));

module.exports = router;
