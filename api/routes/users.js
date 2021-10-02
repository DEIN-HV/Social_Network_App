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
router.get("/:id", async (req, res) => {

    try {
        const user = await User.findById(
            req.body.id,
        );
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
            await user.updateOne({ $push: { following: req.params.id } })

            return res.status(200).json("You have beeen followed")
        }
        else return res.status(400).json("You already follow this user");
    }
    else {
        return res.status(403).json("You cant follow yourself");
    }
});


module.exports = router;