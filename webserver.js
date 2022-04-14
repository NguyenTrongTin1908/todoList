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
    const user = await todoModel.find({ email: "tinewq@yahoo.com" });
    // console.log("DATA", user);
    res.render("todoList", { todo: user });
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
    const { email_ } = "tinewq@yahoo.com";

    console.log("la", req.body);
    const newTodo = new todoModel({
        todo: dataTodo,
        email_: "tinewq@yahoo.com",
        done: "0",
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
app.listen(port, console.log(`Listening on port ${port}...`));