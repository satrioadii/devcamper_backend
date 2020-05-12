//Load env vars
const dotenv = require("dotenv").config({
	path: "./config/config.env",
});

const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
colors.enable();

// Load models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
	fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import into DB
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		await Course.create(courses);
		console.log(colors.bgGreen("Data Imported..."));
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

// Delete Datas in DB
const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		await Course.deleteMany();
		console.log(colors.bgRed("Data deleted..."));
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

if (process.argv[2] === "-i") {
	importData();
} else if (process.argv[2] === "-d") {
	deleteData();
}
