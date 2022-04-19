import express from "express";
import indexController from "../controller/indexController.js";

const router = express.Router();

router.route("/").get(indexController.getAlltodo);
router.route("/delete/:id").get(indexController.Delete);
router.route("/update/:id").get(indexController.Update);
// router.route("/updateStatus/:id").get(indexController.updateStatus);
router.route("/add").post(indexController.Add);

router.route("/checkDone").post(indexController.checkDone);
router.route("/status").get(indexController.Status);

export default router;
