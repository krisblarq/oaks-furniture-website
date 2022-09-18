import express from "express";
import controller from "../controllers/user.controller";

const router = express.Router();

router.post("/create", controller.createUser);
router.get("/get/:userId", controller.getUser);
router.get("/get/", controller.getAllUser);
router.patch("/update/:userId", controller.updateUser);
router.delete("/delete/:userId", controller.deleteUser);

export = router;
