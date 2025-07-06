const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  Index,
  Createnew,
  Addnew,
  Edit,
  Update,
  Delete,
  Show,
  Privacypage,
  Termspage,
} = require("../controllers/listings.js");

router
  .route("/")
  .get(asyncWrap(Index)) // index route
  .post(upload.single("listing[image]"), validateListing, asyncWrap(Addnew)); //add route

// create route
router.get("/new", isLoggedIn, asyncWrap(Createnew));

//edit route(taking to edit form)
router.get("/:id/edit", isLoggedIn, isOwner, asyncWrap(Edit));

router.get("/privacy", asyncWrap(Privacypage));

router.get("/terms", asyncWrap(Termspage));

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    asyncWrap(Update)
  ) //update route(updating changes to main page)
  .delete(isLoggedIn, isOwner, asyncWrap(Delete)) //Delete route
  .get(asyncWrap(Show)); // show route

module.exports = router;
