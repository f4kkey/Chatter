import { create } from "zustand"

export const useAuthStore = create((set) => ({
    authUser: { name: "john", _id: 123, age: "100" },
    isLoggedIn: false,
    login: () => {
        console.log("log in");
        set({ isLoggedIn: true })
    }
})) 