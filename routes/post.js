const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controller/post");

router.get("/", getPosts);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.put("/:id/likePost", auth, likePost);

module.exports = router;
