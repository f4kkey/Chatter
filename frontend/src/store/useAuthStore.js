import axios from "axios"
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { data } from "react-router"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isRegistering: false,
    isLoggingIn: false,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/getme")
            set({ authUser: res.data })
        } catch (error) {
            console.log(error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    register: async (data) => {
        set({ isRegistering: true })
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });

            toast.success("Account created")

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isRegistering: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });

            toast.success("Log in succeed")

        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Log out succeed")

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        try {
            // console.log("update profile")
            const res = await axiosInstance.put('/auth/updateProfile', data)
            set({ authUser: res.data })
            toast.success("Profile updated")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return

    },
})) 
