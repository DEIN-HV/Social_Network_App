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
router.get("/:userId", async (req, res) => {
    try {
        const notifications = await Notification.find({
            userId: { $in: req.params.userId }
        })
        res.status(200).json(notifications);
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