const Conversation = require("../models/Conversation");
const User = require("../models/User");

const router = require("express").Router();

//ADD NEW CONVERSATION
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [
            req.body.senderId,
            req.body.receiverId,
        ]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

//DELETE CONVERSATION
router.delete("/delete/:firstUserId/:secondUserId", async (req, res) => {
    try {
        await Conversation.findOneAndRemove({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] }
        });
        res.status(200).json("delete successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET CONVERSATION OF USER 
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find(
            {
                members: { $in: [req.params.userId] },
            }
        )
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

//GET A CONVERSATION  
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne(
            {
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            }
        )
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;