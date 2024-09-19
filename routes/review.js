const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn , isReviewAuthor} = require("../middleware.js");
const { createReview } = require("../controllers/reviews.js");

const rewiewController = require("../controllers/reviews.js");




// reviews

router.post("/",isLoggedIn, validateReview, wrapAsync(rewiewController.createReview));

// delete reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(rewiewController.deleteReview));

module.exports = router;