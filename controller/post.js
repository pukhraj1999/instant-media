const mongoose = require("mongoose");

const Post = require("../models/postSchema");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = new Post({ ...post });
    await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  //Here we are renaming our id to _id
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post within that id");
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post within that id");
  try {
    const post = await Post.findByIdAndRemove(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthorization user" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post within that id");
  try {
    const post = await Post.findById(id);
    //finding likes with particular Id's
    const index = post.likes.findIndex((id) => id === String(req.userId));
    //for linking the post
    if (index === -1) {
      //like the post
      post.likes.push(req.userId);
    } else {
      //dislike a post
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
