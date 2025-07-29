// src/hooks/useAuth.ts
import { useAuthStore } from "../stores/authStore";
import { authService, type LoginRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const {
    token,
    user,
    isLoggedIn,
    isLoading,
    error,
    setAuth,
    clearAuth,
    setLoading,
    setError,
  } = useAuthStore();
  const navigate = useNavigate();

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      console.log("Login API response object:", response);

      // --- CRITICAL FIX: Check for 'token' and handle missing 'user' object ---
      if (response.token) {
        // Check for 'token' property
        // Since backend doesn't send user object with login, create a placeholder user.
        // In a real app, you'd fetch the user profile via a separate API call here,
        // or ask backend to include user data in login response.
        const placeholderUser = {
          id: 0,
          name: "Logged In User",
          username: credentials.email.split("@")[0],
          email: credentials.email,
          email_verified_at: null,
          otp: null,
          otp_verified_at: "",
          status: "active",
          reference_code: "",
          avatar_url: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_at_human: new Date().toLocaleString(),
          categories: [],
          user_package: {
            id: 0,
            user_id: "0",
            package_id: "0",
            status: "inactive",
            expiration_date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            package: {
              id: 0,
              name: "",
              slug: "",
              image: null,
              intro: null,
              description: null,
              price: "0",
              duration: "0",
              status: "inactive",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_at_human: new Date().toLocaleString(),
            },
          },
          user_mails: [],
          payments: [],
          metas: [],
          meta_data: [],
        };
        setAuth(response.token, placeholderUser); // Use response.token and placeholderUser
        navigate("/dashboard"); // Redirect to dashboard on successful login
      } else {
        // This block should ideally not be hit if LoginResponse interface is correct.
        setError("Login successful, but token was missing from response.");
        console.error(
          "Login successful, but missing token in response:",
          response
        );
      }
    } catch (err: unknown) {
      console.error("Login failed in useAuth hook:", err);
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please check your credentials.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    navigate("/login");
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
