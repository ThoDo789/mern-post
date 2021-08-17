const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

// @router GET api/post
// @description create GET
// access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router POST api/post
// @description create POST
// access private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //simple validation

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();
    res.json({ success: true, message: "happy learning", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @router PUT api/post
// @description create PUT
// access private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //simple validation

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  try {
    let updatePost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };
    //check post existed in data, authorization user update post
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatePost = await Post.findByIdAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });
    // user not authorised to update post or post not found
    if (!updatePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }
    res.json({ success: true, post: updatePost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @router DELETE api/delete
// @description create DELETE
// access private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
    // user not authorised to update post or post not found
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }
    res.json({
      success: true,
      message: "remove post successfully!",
      // post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
