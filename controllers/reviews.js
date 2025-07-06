const Review = require("../models/reviews.js");
const listing = require("../models/listing.js");

const CreateReview = async (req, res) => {
  let data = await listing.findById(req.params.id);
  let newReview = new Review({ ...req.body.review, author: req.user._id }); // this will add current user details to author of reviews

  data.reviews.push(newReview);
  await newReview.save();
  await data.save();
  console.log("review saved");
  req.flash("success", "New Review Added!");
  res.redirect(`/listings/${data._id}`);
};

const DeleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // pull request will search for reviewId in reviews of listing with id and will delete it and then listings will be updated
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};

module.exports = { CreateReview, DeleteReview };
