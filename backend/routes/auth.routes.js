import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { signup,login,logout,getUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/get",protectRoute,getUser);
router.post("/logout",logout);

export default router;