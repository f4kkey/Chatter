import axios from "axios"
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isRegistering: false,

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
})) 
