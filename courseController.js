const courseModel = require("../Models/courseModel.js");
const validation = require("../controllers/validator.js");

let createCourse = async (req, res) => {
  try {
    let data = req.body;

    // Check if data is provided
    if (!validation.isValidBody(data)) {
      return res.status(400).send({ status: false, msg: "No data provided" });
    }

    const { CourseName, CourseCode, Department, Credits, Fees } = data;

    // Add specific validation for each field
    if (!validation.isValid(CourseName)) {
      return res.status(400).send({ status: false, msg: "Please enter the CourseName" });
    }

    if (!validation.isValid(CourseCode)) {
      return res.status(400).send({ status: false, msg: "Please enter the CourseCode" });
    }

    if (!validation.isValid(Department)) {
      return res.status(400).send({ status: false, msg: "Please enter the Department" });
    }

    if (!validation.isValid(Credits)) {
      return res.status(400).send({ status: false, msg: "Please enter the Credits" });
    }

    if (!validation.isValid(Fees)) {
      return res.status(400).send({ status: false, msg: "Please enter the Fees" });
    }

    // Check if CourseCode already exists
    const existingCourse = await courseModel.findOne({ CourseCode: CourseCode });
    if (existingCourse) {
      return res.status(400).send({ status: false, msg: "Course with the same CourseCode already exists" });
    }

    // Create the course
    let registerCourse = await courseModel.create(data);

    return res.status(201).send({
      status: true,
      msg: "Course Data Registered successfully",
      data: registerCourse,
    });
  } catch (error) {
    return res.status(500).send({ status: false, msg: "Internal Server Error" });
  }
};



// Function to get the list of courses
let getCourses = async (req, res) => {
    try {
      // Retrieve all courses from the database
      const courses = await courseModel.find();
  
      return res.status(200).send({
        status: true,
        msg: "List of courses",
        data: courses,
      });
    } catch (error) {
      return res.status(500).send({ status: false, msg: "Internal Server Error" });
    }
  };
  


module.exports = { createCourse,getCourses };