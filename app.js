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
    name: { type: String, required: true, maxlength: 25 },
    age: { type: Number, min: [0, "年齡不能小於0"] },
    major: {
        type: String,
        required: function () {
            return this.scholarship.merit >= 3000;
        },
        enum: [
            "Chemistry",
            "Computer Science",
            "Mathematics",
            "Civil Engineering",
            "undecided",
        ],
    },
    scholarship: {
        merit: { type: Number, default: 0 },
        other: { type: Number, default: 0 },
    },
});

studentSchema.methods.printTotalScholarship = function () {
    return this.scholarship.merit + this.scholarship.other;
};

const Student = mongoose.model("Student", studentSchema);

Student.find()
    .exec()
    .then(arr => {
        arr.forEach(student => {
            console.log(
                student.name +
                    "的總獎學金金額是" +
                    student.printTotalScholarship()
            );
        });
    })
    .catch(e => {
        console.log(e);
    });

app.listen(3000, () => {
    console.log("伺服器正在聆聽port 3000");
});
