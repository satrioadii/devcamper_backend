const express = require("express");
const { register, login, getMe } = require("../controllers/auth");

const { protect } = require("../middleware/auth");

const router = express.Router();

// @rooute  POST /api/v1/auth/register
router.post("/register", register);
// @rooute  POST /api/v1/auth/login
router.post("/login", login);
// @rooute  GET /api/v1/auth/me
router.get("/me", protect, getMe);

module.exports = router;
