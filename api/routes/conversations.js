const Conversation = require("../models/Conversation");
const User = require("../models/User");

const router = require("express").Router();

//ADD NEW CONVERSATION
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [
            req.body.senderId,
            req.body.receiverId,
        ],
        type: 1,
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

//ADD NEW GROUP CONVERSATION
router.post("/group", async (req, res) => {
    const newConversation = new Conversation({
        members: [
            req.body.senderId,
        ],
        type: 2,
        name: req.body.name,
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

//ADD NEW MEMBER TO GROUP CONVERSATION
router.put("/group/add/:memberId", async (req, res) => {
    try {
        const groupConversation = await Conversation.findById(req.body.conversationId);
        await groupConversation.updateOne(
            {
                $push: { members: req.params.memberId }
            },
            { new: true }
        );
        res.status(200).json("add new member successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});

//REMOVE MEMBER FROM GROUP CONVERSATION
router.put("/group/remove/:memberId", async (req, res) => {
    try {
        const groupConversation = await Conversation.findById(req.body.conversationId);
        await groupConversation.updateOne(
            {
                $pull: { members: req.params.memberId }
            },
            { new: true }
        );
        res.status(200).json("remove member successfully");
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
router.get("/", async (req, res) => {
    try {
        const conversation = await Conversation.find(
            {
                $and:
                    [
                        { type: { $in: [req.query.type] } },
                        { members: { $in: [req.query.userId] } },
                    ]

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

// //GET A GROUP CONVERSATION  
// router.get("/group/find/:groupConversationId", async (req, res) => {
//     try {
//         const conversation = await Conversation.findById(
//             {
//                 id: req.params.groupConversationId,
//             }
//         )
//         res.status(200).json(conversation);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })


module.exports = router;