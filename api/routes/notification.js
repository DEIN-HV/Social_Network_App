const router = require("express").Router();
const Notification = require("../models/Notification");

//CREATE A NOTIFICATION
router.post("/", async (req, res) => {
    const newNotification = new Notification(req.body);
    try {
        const saveNotification = await newNotification.save();
        res.status(200).json(saveNotification);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET NOTIFICATION
// router.get("/userId", async (req, res) => {
//     try {
//         const notifications = await Notification.find({
//             userId: { $in: req.params.userId }
//         })
//         res.status(200).json(notifications);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
router.get("/", async (req, res) => {
    try {
        const userId = req.query.userId
        const option = req.query.option
        if (option === "all") {
            const notifications = await Notification.find(
                { userId: { $in: userId } }
            )
            res.status(200).json(notifications);
        }

        if (option === "unread") {
            const notifications = await Notification.find({
                $and: [
                    { userId: { $in: userId } },
                    { isRead: { $in: false } },
                ]
            })
            res.status(200).json(notifications);
        }


    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE NOTIFICATION
router.put("/readed/:id", async (req, res) => {
    try {
        const notifications = await Notification.findByIdAndUpdate(
            req.params.id,
            {
                $set: { isRead: true }
            },
            { new: true })
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;