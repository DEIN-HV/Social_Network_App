const User = require("../models/User");

const router = require("express").Router();

//UPDATE USER
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findOneAndUpdate(
                req.body.id,
                {
                    $set: req.body,
                }
            );

            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    else {
        return res.status(403).json("You can update only your account!");
    }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findOneAndDelete(
                req.body.id,
            );
            return res.status(200).json("Account have been deleted");
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    else {
        return res.status(403).json("You can delete only your account!");
    }
});

//GET A USER
router.get("/", async (req, res) => {

    try {
        const userId = req.query.userId;
        const username = req.query.username;

        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (error) {
        return res.status(400).json(error);
    }
}
);

//FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const followTarget = await User.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        if (!followTarget.followers.includes(req.body.userId)) {
            await followTarget.updateOne({ $push: { followers: req.body.userId } })
            await user.updateOne({ $push: { followings: req.params.id } })

            return res.status(200).json("You have beeen followed")
        }
        else return res.status(400).json("You have already followed this user");
    }
    else {
        return res.status(403).json("You cant follow yourself");
    }
});

//UNFOLLOW A USER
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const unfollowTarget = await User.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        if (unfollowTarget.followers.includes(req.body.userId)) {
            await unfollowTarget.updateOne({ $pull: { followers: req.body.userId } })
            await user.updateOne({ $pull: { followings: req.params.id } })

            return res.status(200).json("You have beeen unfollowed")
        }
        else return res.status(400).json("You havent followed this user not yet");
    }
    else {
        return res.status(403).json("You cant unfollow yourself");
    }
});


module.exports = router;