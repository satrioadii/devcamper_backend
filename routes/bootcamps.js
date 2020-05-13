const express = require("express");
const {
	getBootcamps,
	getBootcamp,
	createBootcamp,
	updateBootcamp,
	deleteBootcamp,
	getBootcampsInRadius,
	bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const { protect, authorize } = require("../middleware/auth");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

// /api/v1/bootcamps/
router
	.route("/")
	.get(
		advancedResults(Bootcamp, {
			path: "courses",
			select: "title tuition description user",
		}),
		getBootcamps
	)
	.post(protect, authorize("publisher", "admin"), createBootcamp);

// /api/v1/bootcamps/:id
router
	.route("/:id")
	.get(getBootcamp)
	.put(protect, authorize("publisher", "admin"), updateBootcamp)
	.delete(protect, authorize("publisher", "admin"), deleteBootcamp);

// /api/v1/bootcamps/radius/:zipcode/:distance
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// /api/v1/bootcamps/:id/photo
router
	.route("/:id/photo")
	.put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
