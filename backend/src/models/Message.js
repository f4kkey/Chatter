import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
        trim: true,
        maxlength: 2000
    },
},
    { timestamps: true }
)
messageSchema.index({ senderID: 1, receiverID: 1, createAt: -1 })

const Message = mongoose.model("Message", messageSchema)

export default Message