import axios from "axios"
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,

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
    }
})) 