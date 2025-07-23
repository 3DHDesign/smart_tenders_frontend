// src/hooks/useAuth.ts
import { useAuthStore } from '../stores/authStore';
import { authService, type LoginRequest } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { token, user, isLoggedIn, isLoading, error, setAuth, clearAuth, setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      console.log("Login API response object:", response);

      // --- CRITICAL FIX: Check for 'token' and handle missing 'user' object ---
      if (response.token) { // Check for 'token' property
        // Since backend doesn't send user object with login, create a placeholder user.
        // In a real app, you'd fetch the user profile via a separate API call here,
        // or ask backend to include user data in login response.
        const placeholderUser = {
          id: 0, // Placeholder ID
          email: credentials.email, // Use the email from credentials
          full_name: "Logged In User", // Generic name
          // Add other default/placeholder properties as needed
        };
        setAuth(response.token, placeholderUser); // Use response.token and placeholderUser
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        // This block should ideally not be hit if LoginResponse interface is correct.
        setError('Login successful, but token was missing from response.');
        console.error('Login successful, but missing token in response:', response);
      }
    } catch (err: any) {
      console.error('Login failed in useAuth hook:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return {
    token,
    user,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
  };
};