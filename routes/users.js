const express = require("express");
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require("../controllers/users");

const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });

// Use this
router.use(protect);
router.use(authorize("admin"));
// Below this will always use protect and authorize admin
// for example: get(protect, authorize("admin"), getUsers).post(protect, athorize("admin"), createUser)
// it is exactly same with the routes below

// /api/v1/users/
router.route("/").get(advancedResults(User), getUsers).post(createUser);

// /api/v1/users/:id
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
