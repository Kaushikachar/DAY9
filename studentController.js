const { json } = require("express");
const StudentModel = require("../Models/studentModel.js");
const validation = require("../controllers/validator.js");
let jwt = require("jsonwebtoken");

let createStudent = async (req, res) => {
  try {
    let data = req.body;
    if (!validation.isValidBody(data)) {
      res.status(400).send({ status: false, msg: "No Data Provided" });
    }
    let { Name, Usn, Gender, Email, Mobile, Password } = data;
    if (!validation.isValid(Name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Name" });
    }
    if (!validation.isValidName.test(Name)) {
      return res.status(400).send({ status: false, msg: "Invalid Name" });
    }
    if (!validation.isValid(Usn)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Usn" });
    }
    let dupUsn = await StudentModel.findOne({ Usn });
    if (dupUsn) {
      return res.status(400).send({ msg: "Usn Already Exist" });
    }

    if (!validation.isValid(Gender)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Gender" });
    }
    if (!validation.isValid(Email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Email" });
    }

    let dupEmail = await StudentModel.findOne({ Email });
    if (dupEmail) {
      return res.status(400).send({ msg: "Email Already Exist" });
    }
    if (!validation.isValidEmail.test(Email)) {
      return res.status(400).send({ msg: "Please enter valid Email" });
    }
    if (!validation.isValid(Mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Mobile" });
    }
    let dupMobile = await StudentModel.findOne({ Mobile });
    if (dupMobile) {
      return res.status(400).send({ msg: "Mobile Already Exist" });
    }
    if (!validation.isValidMobile.test(Mobile)) {
      return res.status(400).send({ msg: "Please enter valid Mobile" });
    }
    if (!validation.isValid(Password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Your Password" });
    }
    let registerStudent = await StudentModel.create(data);
    return res.status(201).send({
      status: true,
      msg: "student Data Registered successfully",
      data: registerStudent,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: "Internal Server Error" });
  }
};
//Login Studnet
let loginStudent = async (req, res) => {
  try {
    let data = req.body;
    if (!validation.isValidBody(data)) {
      return res.status(404).send({ status: false, msg: "No Data provided" });
    }

    let { Email, Password } = data;
    if (!validation.isValid(Email)) {
      return res
        .status(404)
        .send({ status: false, msg: "Please Enter your Email" });
    }
    if (!validation.isValid(Password)) {
      return res
        .status(404)
        .send({ status: false, msg: "Please Enter your Password" });
    }
    let matchStudent = await StudentModel.findOne({ Email, Password });
    if (!matchStudent) {
      return res.status(200).send({ msg: "Student Not Registered" });
    }else{
        const token = jwt.sign(
        {
            studentId: matchStudent._id.toString(),
        },
        "MERN STACK",
        {
            expiresIn:"20000sec",
        }
    );
    return res
       .status(200)
       .send({msg:"Student logged In Successfully",token});
        }
    } catch (err) {
     return res
        .status(500)
        .send({ status: false, msg: "Internal Server Error" });
  }
};

module.exports = { createStudent, loginStudent };
