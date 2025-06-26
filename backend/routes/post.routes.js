import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getPosts, createPost, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/get/posts",getPosts);
router.post("/create/posts",protectRoute,createPost);
router.delete("/:id",protectRoute,deletePost);

export default router;