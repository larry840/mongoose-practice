const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.set("view engine", "ejs");

mongoose
    .connect("mongodb://127.0.0.1/exampleDB")
    .then(() => {
        console.log("成功連結mongoDB");
    })
    .catch(e => {
        console.log(e);
    });

const studentSchema = new Schema({
    name: String,
    age: { type: Number, min: [0, "年齡不能小於0"] },
    major: String,
    scholarship: {
        merit: Number,
        other: Number,
    },
});

const Student = mongoose.model("Student", studentSchema);

Student.find()
    .exec()
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log(e);
    });

app.listen(3000, () => {
    console.log("伺服器正在聆聽port 3000");
});
