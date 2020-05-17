//Load env vars
const dotenv = require("dotenv").config({
	path: "./config/config.env",
});

const path = require("path");

const express = require("express");
const morgan = require("morgan");

// SECURITY THINGS
// NODE-MONGO NO-SQL INJECTION PREVENTION
const mongoSanitize = require("express-mongo-sanitize");
// SECURITY HEADERS
const helmet = require("helmet");
// XSS-PROTECTION
const xss = require("xss-clean");
// RATE-LIMIT
const rateLimit = require("express-rate-limit");
// HPP
const hpp = require("hpp");
// CORS
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const colors = require("colors");
colors.enable();

const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

// Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Dev Logger Middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan(`dev`));
}

// File uploading
app.use(fileupload());

// SECURITY
// Sanitize data - Prevent No-SQL Injection
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent xss (cross site scripting) attacks
app.use(xss());
// Rate Limitting - Max 100 request per 10 minute
const limitter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limitter);
// Prevent http param pollution
app.use(hpp());
// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

// Error handler (must be after the routers)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`.red);

	// Close server && exit process
	server.close(() => process.exit(1));
});
