import express from "express";
import path from "path";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { ObjectId } from "mongodb";
import indexRouter from "./router/indexRoute.js";

const router = express.Router();

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

app.use("/", indexRouter);
app.listen(port, console.log(`Listening on port ${port}...`));
