// src/hooks/useAuth.ts
import { useAuthStore } from "../stores/authStore";
import { authService, type LoginRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../services/userService";
import { toast } from 'react-toastify';

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

if (response.token) {
// --- CRITICAL FIX ---
// Step 1: Save the token to localStorage immediately.
// This ensures the axios interceptor can find it for the next API call.
        localStorage.setItem('authToken', response.token);

// Step 2: Now that the token is saved, fetch the full user details.
const fullUserData = await getDashboardData();

// Step 3: Now, set the auth store state with the full data.
// The setAuth function will also save the token again, which is harmless.
setAuth(response.token, fullUserData);

toast.success("Login successful!");
navigate("/dashboard");
} else {
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