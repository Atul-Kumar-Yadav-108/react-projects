import { create } from "zustand";
import axiosClient from "../api/axiosClient";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    
    // NEW: Loading state to fix logout issue
    isAuthLoading: true,
    setAuthLoaded: () => set({ isAuthLoading: false }),

    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },

    setToken: (token) => {
        console.log("token 3",token)
        localStorage.setItem("token", token);
        set({ token });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null });
    },

    register: async (name, email, password) => {
        const res = await axiosClient.post("/auth/register", {
            name,
            email,
            password,
        });

        return res.data;
    },

    loadUser: async () => {
    try {
        console.log(localStorage.getItem('token'))
        const token = localStorage.getItem('token');
        console.log(token)
        const res = await axiosClient.get("/auth/me", {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    } catch (err) {
        set({ user: null });
    }
},

    login: async (email, password) => {
       const res = await axiosClient.post("/auth/login", { email, password });

    console.log(res); // 🔥 check response

    const user = res.data.data.user;
    const token = res.data.data.token;

    if (!token) throw new Error("No token received");

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({ user, token, isAuthLoading: false });

    return res.data;
    },
}));

// When app starts, let Zustand finish hydration
setTimeout(() => {
    useAuthStore.getState().setAuthLoaded();
}, 0);

export default useAuthStore;
