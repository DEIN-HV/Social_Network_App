const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        type: {
            type: Number,
            enum: [1, 2]
        },
        name: {
            type: String,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Conversation", ConversationSchema);

