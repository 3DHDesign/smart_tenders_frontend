 // src/services/authService.ts
import axios from 'axios';
import { axiosInstance } from './axiosInstance'; // Make sure this path is correct relative to authService.ts

// --- Request and Response Type Definitions ---
// These interfaces define the shape of the data for clarity and type safety.

// UPDATED: RegisterRequest to correctly reflect backend expectations from Postman
export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
  name: string; // Maps from frontend 'fullName' (backend key)
  phone: string;
  address: string; // Maps from frontend 'address1' (backend key)
  address_line_2?: string; // Optional field (backend key)
  district: string; // Maps from frontend 'city' (backend key)
  province: string;
  country: string;
  postal_code?: string; // Optional field (backend key)
  categories: number[]; // Maps from frontend 'selectedCategories' (array of IDs, backend key)
  package_id: string; // Maps from frontend 'selectedPackage' (backend key)
  payment_method: string;
  emails: string[]; // Maps from frontend 'dynamicEmails.map(e => e.address)' (backend key, expecting an array of strings)
}

// Response from the register endpoint
export interface RegisterResponse {
  message: string;
  user?: { // Example user data returned upon successful registration
    id: number;
    email: string;
    full_name: string;
    // ... other user details
  };
  access_token?: string; // Standard JWT token key
  token_type?: string;
  expires_in?: number;
  token?: string; // Added 'token' property based on your console output
}

// CRITICAL FIX: Added 'export' keyword to LoginRequest
export interface LoginRequest {
  email: string;
  password: string;
}

// Response from the login endpoint
export interface LoginResponse {
  status: string; // "success"
  code: number;   // 200
  token: string;  // The actual JWT token (key is 'token', not 'access_token')
  p_expire?: string;  
}

// Request payload for OTP verification
export interface VerifyOtpRequest {
  email: string;
  otp: string;
  user_id?: string; // Added optional user_id field for backend requirement
}

// Response from OTP verification/resend endpoints
export interface OtpResponse {
  message: string;
  token?: string;
  // Could include a status, or other relevant info
}

// Request payload for forgot password request
export interface ForgotPasswordRequest {
  email: string;
}

// Response for forgot password request
export interface ForgotPasswordResponse {
  message: string;
}

// Request payload for forgot password OTP verification
export interface ForgotPasswordOtpVerifyRequest {
  email: string;
  otp: string;
  password: string; // <--- NEW: Required by backend for /forgot-password-otp
  password_confirmation: string; 
}

// Response for forgot password OTP verification
export interface ForgotPasswordOtpVerifyResponse {
  message: string;
  token?: string;
  // May include a token to proceed to reset password, or just a success message
}

// Request payload for password reset
export interface ResetPasswordRequest {
  email: string;
  password: string;
  password_confirmation: string;
  token: string; // The token received after forgot password OTP verification
}

// Response for password reset
export interface ResetPasswordResponse {
  message: string;
}


// --- Auth Service Functions ---
export const authService = {
  /**
   * Registers a new user.
   * @param data The registration form data from the frontend.
   * @returns A promise resolving to the RegisterResponse.
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const payload: Record<string, any> = {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        name: data.name,
        phone: data.phone,
        address: data.address,
        district: data.district,
        province: data.province,
        country: data.country,
        categories: data.categories,
        package_id: data.package_id,
        payment_method: data.payment_method,
        emails: data.emails,
      };

      if (data.address_line_2) {
        payload.address_line_2 = data.address_line_2;
      }
      if (data.postal_code) {
        payload.postal_code = data.postal_code;
      }

      console.log('Sending registration payload:', payload);

      const response = await axiosInstance.post<RegisterResponse>('/register', payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration API Error:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat().join(' ');
            throw new Error(`Registration failed: ${validationErrors}`);
        }
        throw new Error(error.response?.data?.message || 'Registration failed. Please check your details.');
      }
      throw new Error('An unexpected error occurred during registration.');
    }
  },

  /**
   * Logs in a user.
   * @param data The login request data (email, password).
   * @returns A promise resolving to the LoginResponse.
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>('/login', data);
      return response.data; // Return the full response data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login API Error:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat().join(' ');
            throw new Error(`Login failed: ${validationErrors}`);
        }
        throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      }
      throw new Error('An unexpected error occurred during login.');
    }
  },

  /**
   * Verifies an OTP for email confirmation or password reset.
   * @param data The OTP verification request data (email, otp, user_id).
   * @returns A promise resolving to the OtpResponse.
   */
  verifyOtp: async (data: VerifyOtpRequest): Promise<OtpResponse> => {
    try {
      const payload = {
        email: data.email,
        otp: data.otp,
        user_id: data.email,
      };
      console.log('Sending verifyOtp payload:', payload);

      const response = await axiosInstance.post<OtpResponse>('/verify-otp', payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('OTP Verification API Error:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat().join(' ');
            throw new Error(`OTP verification failed: ${validationErrors}`);
        }
        throw new Error(error.response?.data?.message || 'OTP verification failed. Please check the code.');
      }
      throw new Error('An unexpected error occurred during OTP verification.');
    }
  },

  /**
   * Resends an OTP to the specified email.
   * @param email The email address to resend OTP to.
   * @returns A promise resolving to the OtpResponse.
   */
  resendOtp: async (email: string): Promise<OtpResponse> => {
    try {
      const payload = { email: email };
      const response = await axiosInstance.post<OtpResponse>('/resend-otp', payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Resend OTP API Error:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat().join(' ');
            throw new Error(`Failed to resend OTP: ${validationErrors}`);
        }
        throw new Error(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
      }
      throw new Error('An unexpected error occurred while resending OTP.');
    }
  },

  /**
   * Requests a password reset link/OTP for a given email.
   * @param data The forgot password request data (email).
   * @returns A promise resolving to the ForgotPasswordResponse.
   */
  forgotPasswordRequest: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      const response = await axiosInstance.post<ForgotPasswordResponse>('/forgot-password-request', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to send password reset request.');
      }
      throw new Error('An unexpected error occurred during password reset request.');
    }
  },

  /**
   * Verifies an OTP for a forgot password flow.
   * @param data The forgot password OTP verification request data (email, otp).
   * @returns A promise resolving to the ForgotPasswordOtpVerifyResponse.
   */
  forgotPasswordVerifyOtp: async (data: ForgotPasswordOtpVerifyRequest): Promise<ForgotPasswordOtpVerifyResponse> => {
    try {
      // --- CRITICAL FIX: Send password and password_confirmation in the payload ---
      const payload = {
        email: data.email,
        otp: data.otp,
        password: data.password,
        password_confirmation: data.password_confirmation,
      };
      console.log('Sending forgotPasswordVerifyOtp payload:', payload);

      // This endpoint now expects OTP, new password, and confirm password
      const response = await axiosInstance.post<ForgotPasswordOtpVerifyResponse>('/forgot-password-otp', payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Forgot Password OTP Verification API Error:', error.response?.data || error.message);
        if (error.response?.data?.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat().join(' ');
            throw new Error(`Forgot password OTP verification failed: ${validationErrors}`);
        }
        throw new Error(error.response?.data?.message || 'Forgot password OTP verification failed.');
      }
      throw new Error('An unexpected error occurred during forgot password OTP verification.');
    }
  },

  /**
   * Resets the user's password using the provided token and new passwords.
   * @param data The reset password request data (email, password, password_confirmation, token).
   * @returns A promise resolving to the ResetPasswordResponse.
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      const response = await axiosInstance.post<ResetPasswordResponse>('/reset-password', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Password reset failed.');
      }
      throw new Error('An unexpected error occurred during password reset.');
    }
  },
};