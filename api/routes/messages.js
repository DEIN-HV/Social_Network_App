const Message = require("../models/Message");

const router = require("express").Router();

//ADD NEW MESSAGE
router.post("/", async (req, res) => {
    const newMess = new Message(req.body);

    try {
        const savedMess = await newMess.save();
        res.status(200).json(savedMess);
    } catch (error) {
        res.status(400).json(error);
    }
});

//GET ALL MESSAGES OF A CONVERSATION
router.get("/:conversationId", async (req, res) => {

    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;