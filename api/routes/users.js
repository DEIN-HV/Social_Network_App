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
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                {
                    $set: req.body,
                },
                { new: true }
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

//SEARCH USER
router.get("/search", async (req, res) => {
    try {
        const username = req.query.username;
        const _page = req.query._page;
        // const _limit = req.query._limit;
        const _limit = 5
        // console.log(_limit)
        // console.log(_limit)
        let user
        if (_page) {
            user = await User
                .find({ username: { $regex: '.*' + username + '.*' } })
                .limit(_limit)
                .skip((_page - 1) * _limit)
                .sort({
                    username: 'asc'
                })
        }
        else {
            user = await User
                .find({ username: { $regex: '.*' + username + '.*' } })
                .sort({
                    username: 'asc'
                })
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}
);

//FRIEND REQUESTS (FOLLOW REQUEST)
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const followTarget = await User.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        if (!followTarget.followers.includes(req.body.userId)) {
            await followTarget.updateOne({ $push: { followers: req.body.userId } })
            await user.updateOne({ $push: { followings: req.params.id } })
            return res.status(200).json("You have been request")
        }
        else return res.status(400).json("You have already requested this user");
    }
    else {
        return res.status(403).json("You cant request yourself");
    }
});

//CANCEL FRIEND REQUESTS (UNFOLLOW REQUEST)
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const unfollowTarget = await User.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        if (unfollowTarget.followers.includes(req.body.userId)) {
            await unfollowTarget.updateOne({ $pull: { followers: req.body.userId } })
            await user.updateOne({ $pull: { followings: req.params.id } })
            return res.status(200).json("You have beeen canceled request")
        }
        else return res.status(400).json("You havent requested this user not yet");
    }
    else {
        return res.status(403).json("You cant cancel request yourself");
    }
});

//ACCEPT FRIEND REQUEST
router.put("/:id/request", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const acceptTarget = await User.findById(req.params.id);
        const user = await User.findById(req.body.userId);
        const type = req.body.type;

        if (type === 1) {
            //ADD FRIEND
            await acceptTarget.updateOne({ $push: { friendIds: req.body.userId } })
            await user.updateOne({ $push: { friendIds: req.params.id } })
        }

        //REMOVE REQUEST
        await acceptTarget.updateOne({ $pull: { followings: req.body.userId } })
        await user.updateOne({ $pull: { followers: req.params.id } })

        return res.status(200).json("You have been friend")

    }
    else {
        return res.status(403).json("You cant accept yourself");
    }
});

//REMOVE FRIEND 
router.put("/:id/friendRemove", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const acceptTarget = await User.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        await acceptTarget.updateOne({ $pull: { friendIds: req.body.userId } })
        await user.updateOne({ $pull: { friendIds: req.params.id } })
        return res.status(200).json("You have been removed friend")
    }
    else {
        return res.status(403).json("You cant remove friend yourself");
    }
});


module.exports = router;