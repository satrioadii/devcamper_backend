const express = require("express");
const {
	register,
	login,
	getMe,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

const router = express.Router();

// @rooute  POST /api/v1/auth/register
router.post("/register", register);
// @rooute  POST /api/v1/auth/login
router.post("/login", login);
// @rooute  GET /api/v1/auth/me
router.get("/me", protect, getMe);
// @rooute  PUT /api/v1/auth/updatedetails
router.put("/updatedetails/", protect, updateDetails);
// @rooute  PUT /api/v1/auth/updatepassword
router.put("/updatepassword/", protect, updatePassword);
// @rooute  POST /api/v1/auth/forgotpassword
router.post("/forgotpassword", forgotPassword);
// @rooute  PUT /api/v1/auth/resetpassword/:resettoken
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
