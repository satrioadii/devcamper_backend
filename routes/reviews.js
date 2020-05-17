const express = require("express");

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const Course = require("../models/Course");
const Review = require("../models/Review");

const {
	getReviews,
	getReview,
	addReview,
	updateReview,
	deleteReview,
} = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

// /api/v1/reviews/
router
	.route("/")
	.get(
		advancedResults(Review, {
			path: "bootcamp",
			select: "name description averageCost",
		}),
		getReviews
	)
	.post(protect, authorize("user", "admin"), addReview);

// /api/v1/reviews/:id
router
	.route("/:id")
	.get(getReview)
	.put(protect, authorize("user", "admin"), updateReview)
	.delete(protect, authorize("user", "admin"), deleteReview);

module.exports = router;
