const express = require("express");
const {
	getBootcamps,
	getBootcamp,
	createBootcamp,
	updateBootcamp,
	deleteBootcamp,
	getBootcampsInRadius,
} = require("../controllers/bootcamps");

const router = express.Router();

// /api/v1/bootcamps/
router.route("/").get(getBootcamps).post(createBootcamp);

// /api/v1/bootcamps/:id
router
	.route("/:id")
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

// /api/v1/bootcamps/radius/:zipcode/:distance
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

module.exports = router;
