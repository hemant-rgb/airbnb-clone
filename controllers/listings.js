const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");




const Index = async (req, res) => {
  const list = await listing.find({});
  res.render("listings/index.ejs", { list });
};
const Createnew = async (req, res) => {
  res.render("listings/create.ejs"); // if signed in then allow to create
};

const Addnew = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "please send valid data"); //
  }
  if (!req.file) {
    throw new ExpressError(400, "No image uploaded");
  }
  let url = req.file.path;
  let filename = req.file.filename;
  let doc = req.body.listing; //listing is an object containing key value pair of new entry made
  const newListing = new listing(doc);
  newListing.owner = req.user._id; // this will add user info to owner in listings
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "Added Successfully !");

  res.redirect("/listings");
};

const Edit = async (req, res) => {
  let { id } = req.params;
  const data = await listing.findById(id);
  let originalImage = data.image.url;
  originalImage = originalImage.replace("/upload", "/upload/h_300,w_250"); // Original image rendering will put unnecessary load so we decrease the quality of image

  if (!data) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { data, originalImage });
};

const Update = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "please send valid data"); //
  }
  if (!req.file) {
    throw new ExpressError(400, "No image uploaded");
  }
  const doc = req.body.listing;
  let { id } = req.params;
  let updatelisting = await listing.findByIdAndUpdate(id, doc);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatelisting.image = { url, filename };
    await updatelisting.save();
  }

  req.flash("success", "Updated Successfully !");

  res.redirect(`/listings/${id}`);
};

const Delete = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", "Deleted Successfully !");
  res.redirect("/listings");
};
const Show = async (req, res) => {
  let { id } = req.params;
  const data = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner"); //we populate reviews and its author and also owner for this listing

  if (!data) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { data });
};

const Privacypage = async (req, res) => {
  res.render("listings/privacy.ejs");
};
const Termspage = async (req, res) => {
  res.render("listings/terms.ejs");
};

module.exports = {
  Index,
  Createnew,
  Addnew,
  Edit,
  Update,
  Delete,
  Show,
  Privacypage,
  Termspage,
};
