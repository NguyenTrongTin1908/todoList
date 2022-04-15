import express from "express";
import path from "path";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { ObjectId } from "mongodb";

const router = express.Router();
mongoose.connect("mongodb://localhost:27017/todo_list");
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());

app.use(express.json());
// app.use(express.static("./public"));
app.set("views", "./views");
app.set("view engine", "ejs");
const port = 4000;
import { todoModel } from "./model/todo.js";
app.get("/", async(req, res) => {
    let temp = new Array("all", "completed", "active", "has-due-date");

    const user = await todoModel.find({ email: "tinewq@yahoo.com" });
    // console.log("DATA", user);
    res.render("todoList", { todo: user, status: temp });
});

app.get("/delete/:id", async(req, res) => {
    let idObject = new ObjectId(req.params.id);

    const result = await todoModel
        .findByIdAndDelete({ _id: idObject })
        .then(() => {
            // res.send("CC");
            res.redirect("/");
        });

    res.send(result);
});

app.get("/update/:id", async(req, res) => {
    let idObject = new ObjectId(req.params.id);
    // console.log("CC", id);

    const result = await todoModel
        .findByIdAndUpdate(idObject, { todo: "cc" })
        .then(() => {
            // res.send("CC");
            res.redirect("/");
        });
    // console.log(result);

    res.send(result);
});

app.get("/updateStatus/:id", async(req, res) => {
    let idObject = new ObjectId(req.params.id);
    // console.log("CC", id);

    const result = await todoModel
        .findByIdAndUpdate(idObject, { todo: "cc" })
        .then(() => {
            // res.send("CC");
            res.redirect("/");
        });
    console.log(result.done);

    res.send(result);
});

app.post("/add", (req, res) => {
    const dataTodo = req.body.todo;
    const inputDate = req.body.inputDate;
    const { email_ } = "tinewq@yahoo.com";

    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // prints date in YYYY-MM-DD format
    let time = year + "-" + month + "-" + date;

    const newTodo = new todoModel({
        todo: dataTodo,
        email_: "tinewq@yahoo.com",
        done: "0",
        date: inputDate,
    });

    newTodo.save().then(() => {
        // res.send("CC");
        res.redirect("/");
    });
});

app.post("/checkDone", async(req, res) => {
    let datacall = new ObjectId(req.body.id);

    const result = await todoModel
        .findByIdAndUpdate(datacall, { done: "1" })
        .then(() => {
            // res.send("CC");
            console.log("id la ", datacall);
        });
});

app.get("/status", async(req, res) => {
    console.log("Tai ", req.query.filter);
    let user = null;
    let temp = null;
    let new_arr = null;
    let valueToRemove = null;

    temp = new Array("all", "completed", "active", "has-due-date");
    // Hoặc

    switch (req.query.filter) {
        case "active":
            // code block
            valueToRemove = "active";
            user = await todoModel.find({ done: "0" });
            new_arr = temp.filter((item) => item !== valueToRemove);
            new_arr.unshift("active");
            console.log("hu", new_arr);
            break;
        case "completed":
            // code block
            user = await todoModel.find({ done: "1" });
            valueToRemove = "completed";
            new_arr = temp.filter((item) => item !== valueToRemove);
            new_arr.unshift("completed");
            console.log("hu", new_arr);
            break;
        case "has-due-date":
            // code block
            valueToRemove = "has-due-date";
            user = await todoModel.find({ email: "tinewq@yahoo.com" });
            new_arr = temp.filter((item) => item !== valueToRemove);
            new_arr.unshift("has-due-date");
            console.log("hu", new_arr);
            break;
        default:
            valueToRemove = "all";
            user = await todoModel.find({ email: "tinewq@yahoo.com" });
            new_arr = temp.filter((item) => item !== valueToRemove);
            new_arr.unshift("all");
            console.log("hu", new_arr);
    }

    if (user) res.render("todoList", { todo: user, status: new_arr });
});
app.listen(port, console.log(`Listening on port ${port}...`));