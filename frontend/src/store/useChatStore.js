import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chatters: [],
    messages: [],
    tab: "chats",
    selectedUser: null,
    unreadUsers: [],
    isUsersLoading: false,
    isMessagesLoading: false,

    setTab: (tab) => set({ tab: tab }),
    setSelectedUser: (user) => {
        set({ selectedUser: user });
        if (user) {
            const currentUnreads = get().unreadUsers;
            if (currentUnreads.includes(user._id)) {
                set({ unreadUsers: currentUnreads.filter(id => id !== user._id) });
            }
        }
    },

    getAllContacts: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/messages/contacts", data)
            set({ allContacts: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getChatters: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/messages/chats", data)
            set({ chatters: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    getUnreadUsers: async () => {
        try {
            const res = await axiosInstance.get("/messages/unread");
            set({ unreadUsers: res.data });
        } catch (error) {
            console.error("Failed to fetch unread messages", error);
        }
    },

    sendMessage: async (data) => {
        const { selectedUser, messages } = get()
        const { authUser } = useAuthStore.getState()
        const tmpID = `temp-${Date.now()}`

        const tmpMessage = {
            _id: tmpID,
            senderID: authUser._id,
            receiverID: selectedUser._id,
            text: data.text,
            image: data.image,
            createdAt: new Date().toISOString(),
        }

        set({ messages: [...messages, tmpMessage] })

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, data)
            set({
                messages: messages.concat(res.data)
            })
        } catch (error) {
            set({ messages: messages })
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const { socket } = useAuthStore.getState();
        if (!socket) return;

        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            const { selectedUser, messages, unreadUsers } = get();

            if (selectedUser?._id === newMessage.senderID) {
                set({ messages: [...messages, newMessage] });
            } else {
                if (!unreadUsers.includes(newMessage.senderID)) {
                    set({ unreadUsers: [...unreadUsers, newMessage.senderID] });
                }
            }
        });
    },

    unsubscribeFromMessages: () => {
        const { socket } = useAuthStore.getState();
        if (socket) socket.off("newMessage");
    },
}))