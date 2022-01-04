const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//CREATE A POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId === post.userId) {

            const updatedPost = await post.updateOne(
                { $set: req.body }
            );
            res.status(200).json("You have been updated");
        }
        else {
            res.status(403).json("You can update only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId === post.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//LIKE A POST
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("you have been liked this post");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("you have been disliked this post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET A POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET A POST
router.get("/profilePost/:userId", async (req, res) => {
    try {
        const post = await Post.find({ userId: req.params.userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET IMAGE BLOG
router.get("/imgBlog/:userId", async (req, res) => {
    try {
        // const post = await Post.find({ userId: req.params.userId });
        const post = await Post.find(
            {
                $and: [
                    { userId: req.params.userId },
                    { img: { $ne: "" } }
                ]
            }
        );
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET TIMELINE
router.get("/timeline/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const myPost = await Post.find({ userId: user._id });
        const myFriendPost = await Promise.all(
            user.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(myPost.concat(...myFriendPost));
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;