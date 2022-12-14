import express, { Request, Response } from "express";
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();
router.post(
  "/createuser",
  validateResource(createUserSchema),
  createUserHandler
);
// router.get("/get/:userId", controller.getUser);
// router.get("/get/", controller.getAllUser);
// router.patch("/update/:userId", controller.updateUser);
// router.delete("/delete/:userId", controller.deleteUser);

export = router;
