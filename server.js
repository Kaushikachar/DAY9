// console.log("Hello Everyone");
const express = require("express");
const mongoose = require("mongoose");
const routes= require("./Routes/route");

const app = express();
app.use(express.json());

app.use("/",routes);

mongoose.connect("mongodb+srv://koushikachar:Kaushi%40123@kaushik.ztrwywg.mongodb.net/internship")
.then(()=>{
    console.log("database is connected successfully");
})
.catch((err)=>{
    console.log(err,"something went wrong");
});

// mongoose
//   .connect(
//     "mongodb+srv://koushikachar:Kaushi%40123@kaushik.ztrwywg.mongodb.net/"
//   )
//   .then(() => {
//     console.log("MongoDb Connected");
//   })
//   .catch((err) => {
//     console.log(err, "Kaushik is Wrong");
//   });

app.get("/test", (req, res) => {
  res.send("Hello Everyone,This is Test Api😊");
});

app.listen(5000, () => {
  console.log("Server Is Running on Port 5000");
});



