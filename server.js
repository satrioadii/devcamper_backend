//Load env vars
const dotenv = require("dotenv").config({
	path: "./config/config.env",
});

const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const colors = require("colors");
colors.enable();

// Route files
const bootcamps = require("./routes/bootcamps");

// Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Dev Logger Middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan(`dev`));
}
// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

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
