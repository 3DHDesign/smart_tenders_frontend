// src/stores/authStore.ts
import { create } from 'zustand';

// Define the shape of the user data you expect after login
interface User {
  id: number;
  email: string;
  full_name: string;
  // Add any other user properties you receive from your backend
}

// Define the shape of your auth state
interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean; // For global auth loading (e.g., initial check)
  error: string | null; // For global auth errors

  // Actions
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => void; // To check localStorage on app load
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: true, // Start as true to indicate initial auth check
  error: null,

  setAuth: (token, user) => {
    localStorage.setItem('authToken', token); // Persist token
    set({ token, user, isLoggedIn: true, isLoading: false, error: null });
  },

  clearAuth: () => {
    localStorage.removeItem('authToken'); // Remove token
    set({ token: null, user: null, isLoggedIn: false, isLoading: false, error: null });
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  initializeAuth: () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // In a real app, you'd want to verify this token with your backend
      // (e.g., /api/user endpoint) to get fresh user data and ensure token validity.
      // For now, we'll assume it's valid and set a placeholder user.
      // A more robust solution would involve fetching user data here.
      set({ token: storedToken, isLoggedIn: true, isLoading: false, user: { id: 0, email: 'unknown@example.com', full_name: 'Authenticated User' } });
    } else {
      set({ isLoggedIn: false, isLoading: false });
    }
  },
}));

// Call initializeAuth when the store is first created
// This ensures that when the app loads, it checks for an existing token
useAuthStore.getState().initializeAuth();