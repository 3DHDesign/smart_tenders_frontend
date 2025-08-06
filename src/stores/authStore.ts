// src/stores/authStore.ts
import { create } from "zustand";
import { getDashboardData, type UserDetails } from "../services/userService";
import { toast } from "react-toastify";

interface AuthState {
  token: string | null;
  user: UserDetails | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  isPackageActive: boolean;

  setAuth: (token: string, user: UserDetails) => void;
  setUserData: (user: UserDetails) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: true,
  error: null,
  isPackageActive: false,

  setAuth: (token, user) => {
    // Inside the setAuth function
    console.log("--- setAuth debug ---");
    console.log("Received user object:", user);
    console.log("User package status is:", user?.user_package?.status);
    console.log("---------------------");
    localStorage.setItem("authToken", token);
    set({
      token,
      user,
      isLoggedIn: true,
      isLoading: false,
      error: null,
      // --- FINAL CORRECT CHECK: Check the package's status ---
      isPackageActive: user.user_package?.package?.status === "active",
    });
  },

  setUserData: (user) => {
    set({
      user,
      isLoggedIn: true,
      // --- FINAL CORRECT CHECK: Check the package's status ---
      isPackageActive: user.user_package?.package?.status === "active",
    });
  },

  clearAuth: () => {
    localStorage.removeItem("authToken");
    set({
      token: null,
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,
      isPackageActive: false,
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  initializeAuth: async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const userData = await getDashboardData();
        get().setAuth(storedToken, userData);
      } catch (err) {
        console.error(
          "Failed to re-authenticate or fetch user data on app load:",
          err
        );
        toast.error("Session expired or invalid. Please log in again.", {
          autoClose: 5000,
        });
        get().clearAuth();
      } finally {
        get().setLoading(false);
      }
    } else {
      set({ isLoggedIn: false, isLoading: false, isPackageActive: false });
    }
  },
}));
