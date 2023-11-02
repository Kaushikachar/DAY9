// const express = require("express");
// const router = express.Router();
// const StudentController= require("../controllers/studentController.js");
// const CourseController= require("../controllers/courseController.js");

// router.post("/register",StudentController.createStudent);
// router.post("/login",StudentController.loginStudent);

// module.exports= router;

const express = require("express");
const router = express.Router();
const CourseController= require("../controllers/courseController.js");

router.post("/Courseregister",CourseController.createCourse);

router.get("/courseList", CourseController.getCourses);


module.exports= router;