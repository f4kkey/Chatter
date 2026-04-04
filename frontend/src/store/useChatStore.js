import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chatters: [],
    messages: [],
    tab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setTab: (tab) => set({ tab: tab }),
    setSelectedUser: (user) => set({ selectedUser: user }),

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
}))