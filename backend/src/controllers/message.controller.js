import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketID, socketSV } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const currentUser = req.user
        const allContacts = await User.find({ _id: { $ne: currentUser._id } }).select("-password")
        res.status(200).json(allContacts)
    } catch (error) {
        console.log("Error in get contacts controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const currentUser = req.user
        const userToChatID = req.params.id
        const message = await Message.find({
            $or: [
                { senderID: currentUser._id, receiverID: userToChatID },
                { senderID: userToChatID, receiverID: currentUser._id },
            ]
        }).sort({ createdAt: 1 })
        res.status(200).json(message);
    } catch (error) {
        console.log("Error in get messages controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        // console.log(text)
        const receiverID = req.params.id
        const senderID = req.user._id

        if (!text && !image) {
            return res.status(400).json({ message: "Required text or message" })
        }

        if (receiverID.toString() === senderID.toString()) {
            return res.status(400).json({ message: "Can't send message to yourself" })
        }

        if (!receiverID) {
            return res.status(400).json({ message: "Receiver not found" })
        }

        let imageURL;
        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image);
            imageURL = uploadRes.secure_url;
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image: imageURL
        });

        await newMessage.save();

        const receiverSocketID = getReceiverSocketID(receiverID)
        // console.log(receiverID, receiverSocketID)
        if (receiverSocketID) {
            console.log('socket message has been sent')
            socketSV.to([...receiverSocketID]).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in send message controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getChatters = async (req, res) => {
    try {
        const currentUser = req.user

        const messages = await Message.find({
            $or: [
                { senderID: currentUser._id },
                { receiverID: currentUser._id },
            ]
        })

        const chatterIDs = [
            ...new Set(
                messages.map(msg =>
                    msg.senderID.toString() === currentUser._id.toString()
                        ? msg.receiverID.toString()
                        : msg.senderID.toString()
                )
            ),
        ];

        const chatters = await User.find({
            _id: { $in: chatterIDs }
        }).select("-password")

        res.status(200).json(chatters)
    } catch (error) {
        console.log("Error in get chatters controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}