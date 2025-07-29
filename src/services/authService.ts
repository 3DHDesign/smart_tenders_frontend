 // src/services/authService.ts
import axios from "axios";
import { axiosInstance } from "./axiosInstance"; // Make sure this path is correct relative to authService.ts

// --- Request and Response Type Definitions ---
// These interfaces define the shape of the data for clarity and type safety.

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  phone: string;
  address: string;
  address_line_2?: string;
  district: string;
  province: string;
  country: string;
  postal_code?: string;
  categories: number[];
  package_id: string;
  payment_method: string;
  emails: string[];
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    full_name: string;
  };
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  code: number;
  token: string;
  p_expire?: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  user_id?: string;
}

export interface OtpResponse {
  message: string;
  token?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ForgotPasswordOtpVerifyRequest {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordOtpVerifyResponse {
  message: string;
  token?: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}

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
      // --- CRITICAL FIX: Explicitly type payload as RegisterRequest ---
      // This ensures type safety and removes 'any'.
      const payload: RegisterRequest = {
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
        // Conditionally add optional fields only if they are present in data
        ...(data.address_line_2 && { address_line_2: data.address_line_2 }),
        ...(data.postal_code && { postal_code: data.postal_code }),
      };

      console.log("Sending registration payload:", payload);

      const response = await axiosInstance.post<RegisterResponse>(
        "/register",
        payload
      );
      return response.data;
    } catch (err: unknown) {
      console.error("Registration API Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const validationErrors = Object.values(err.response.data.errors)
            .flat()
            .join(" ");
          throw new Error(`Registration failed: ${validationErrors}`);
        }
        throw new Error(
          err.response?.data?.message ||
            "Registration failed. Please check your details."
        );
      }
      throw new Error("An unexpected error occurred during registration.");
    }
  },

  /**
   * Logs in a user.
   * @param data The login request data (email, password).
   * @returns A promise resolving to the LoginResponse.
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>("/login", data);
      return response.data;
    } catch (err: unknown) {
      console.error("Login API Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const validationErrors = Object.values(err.response.data.errors)
            .flat()
            .join(" ");
          throw new Error(`Login failed: ${validationErrors}`);
        }
        throw new Error(
          err.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      }
      throw new Error("An unexpected error occurred during login.");
    }
  },

  /**
   * Verifies an OTP for email confirmation or password reset.
   * @param data The OTP verification request data (email, otp, user_id).
   * @returns A promise resolving to the OtpResponse.
   */
  verifyOtp: async (data: VerifyOtpRequest): Promise<OtpResponse> => {
    try {
      const payload: VerifyOtpRequest = { // Explicitly type payload
        email: data.email,
        otp: data.otp,
        user_id: data.email,
      };
      console.log("Sending verifyOtp payload:", payload);

      const response = await axiosInstance.post<OtpResponse>(
        "/verify-otp",
        payload
      );
      return response.data;
    } catch (err: unknown) {
      console.error("OTP Verification API Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const validationErrors = Object.values(err.response.data.errors)
            .flat()
            .join(" ");
          throw new Error(`OTP verification failed: ${validationErrors}`);
        }
        throw new Error(
          err.response?.data?.message ||
            "OTP verification failed. Please check the code."
        );
      }
      throw new Error("An unexpected error occurred during OTP verification.");
    }
  },

  /**
   * Resends an OTP to the specified email.
   * @param email The email address to resend OTP to.
   * @returns A promise resolving to the OtpResponse.
   */
  resendOtp: async (email: string): Promise<OtpResponse> => {
    try {
      const payload: { email: string } = { email: email }; // Explicitly type payload
      const response = await axiosInstance.post<OtpResponse>(
        "/resend-otp",
        payload
      );
      return response.data;
    } catch (err: unknown) {
      console.error("Resend OTP API Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const validationErrors = Object.values(err.response.data.errors)
            .flat()
            .join(" ");
          throw new Error(`Failed to resend OTP: ${validationErrors}`);
        }
        throw new Error(
          err.response?.data?.message ||
            "Failed to resend OTP. Please try again."
        );
      }
      throw new Error("An unexpected error occurred while resending OTP.");
    }
  },

  /**
   * Requests a password reset link/OTP for a given email.
   * @param data The forgot password request data (email).
   * @returns A promise resolving to the ForgotPasswordResponse.
   */
  forgotPasswordRequest: async (
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    try {
      const response = await axiosInstance.post<ForgotPasswordResponse>(
        "/forgot-password-request",
        data
      );
      return response.data;
    } catch (err: unknown) {
      console.error("Forgot Password Request Error:", err);
      if (axios.isAxiosError(err)) {
        throw new Error(
          err.response?.data?.message ||
            "Failed to send password reset request."
        );
      }
      throw new Error(
        "An unexpected error occurred during password reset request."
      );
    }
  },

  /**
   * Verifies an OTP for a forgot password flow.
   * @param data The forgot password OTP verification request data (email, otp).
   * @returns A promise resolving to the ForgotPasswordOtpVerifyResponse.
   */
  forgotPasswordVerifyOtp: async (
    data: ForgotPasswordOtpVerifyRequest
  ): Promise<ForgotPasswordOtpVerifyResponse> => {
    try {
      const payload: ForgotPasswordOtpVerifyRequest = { // Explicitly type payload
        email: data.email,
        otp: data.otp,
        password: data.password,
        password_confirmation: data.password_confirmation,
      };
      console.log("Sending forgotPasswordVerifyOtp payload:", payload);

      const response =
        await axiosInstance.post<ForgotPasswordOtpVerifyResponse>(
          "/forgot-password-otp",
          payload
        );
      return response.data;
    } catch (err: unknown) {
      console.error("Forgot Password OTP Verification API Error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const validationErrors = Object.values(err.response.data.errors)
            .flat()
            .join(" ");
          throw new Error(
            `Forgot password OTP verification failed: ${validationErrors}`
          );
        }
        throw new Error(
          err.response?.data?.message ||
            "Forgot password OTP verification failed."
        );
      }
      throw new Error(
        "An unexpected error occurred during forgot password OTP verification."
      );
    }
  },

  /**
   * Resets the user's password using the provided token and new passwords.
   * @param data The reset password request data (email, password, password_confirmation, token).
   * @returns A promise resolving to the ResetPasswordResponse.
   */
  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    try {
      const response = await axiosInstance.post<ResetPasswordResponse>(
        "/reset-password",
        data
      );
      return response.data;
    } catch (err: unknown) { // Changed 'any' to 'unknown'
      console.error("Password Reset Error:", err);
      if (axios.isAxiosError(err)) {
        throw new Error(
          err.response?.data?.message || "Password reset failed."
        );
      }
      throw new Error("An unexpected error occurred during password reset.");
    }
  },
};