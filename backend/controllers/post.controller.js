import Post from "../models/BlogPost.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user._id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};