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
			select: "title tuition description",
		}),
		getBootcamps
	)
	.post(createBootcamp);

// /api/v1/bootcamps/:id
router
	.route("/:id")
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

// /api/v1/bootcamps/radius/:zipcode/:distance
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// /api/v1/bootcamps/:id/photo
router.route("/:id/photo").put(bootcampPhotoUpload);

module.exports = router;
