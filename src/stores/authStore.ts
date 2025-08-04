 // src/stores/authStore.ts
import { create } from 'zustand';
import { getDashboardData, type UserDetails } from '../services/userService'; // Import UserDetails and getDashboardData
import { toast } from 'react-toastify'; // For user feedback

// Define the shape of your auth state
interface AuthState {
  token: string | null;
  user: UserDetails | null; // This now uses the comprehensive UserDetails type
  isLoggedIn: boolean; // THIS IS THE isAuthenticated STATUS
  isLoading: boolean; // For global auth loading (e.g., initial check)
  error: string | null; // For global auth errors
  isPackageActive: boolean; // Tracks if the user's package status is 'active'

  // Actions
  setAuth: (token: string, user: UserDetails) => void; // User type is now UserDetails
  setUserData: (user: UserDetails) => void; // To update user data from DashboardPage
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>; // This function will fetch user data
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isLoggedIn: false, // Default to false
  isLoading: true, // Start as true to indicate initial auth check
  error: null,
  isPackageActive: false, // Default to false

  setAuth: (token, user) => {
    localStorage.setItem('authToken', token); // Persist token
    set({
      token,
      user,
      isLoggedIn: true, // Set to true here
      isLoading: false,
      error: null,
      isPackageActive: user.status === 'active', // Derived from user.status
    });
  },

  setUserData: (user) => { // This action is called from DashboardPage after fetching data
    set({
      user,
      isLoggedIn: true, // Always true when setting user data
      isPackageActive: user.status === 'active', // Update active status
    });
  },

  clearAuth: () => {
    localStorage.removeItem('authToken'); // Remove token
    set({ token: null, user: null, isLoggedIn: false, isLoading: false, error: null, isPackageActive: false });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  initializeAuth: async () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const userData = await getDashboardData();
        get().setAuth(storedToken, userData);
      } catch (err) {
        console.error("Failed to re-authenticate or fetch user data on app load:", err);
        toast.error("Session expired or invalid. Please log in again.", { autoClose: 5000 });
        get().clearAuth();
      } finally {
        get().setLoading(false);
      }
    } else {
      set({ isLoggedIn: false, isLoading: false, isPackageActive: false });
    }
  },
}));

// IMPORTANT: Ensure 'useAuthStore.getState().initializeAuth();' is NOT at the very bottom of this file.
// It should only be called once in your App.tsx's useEffect.