// src/services/userAccountService.ts
import axios from 'axios';
import { axiosInstance } from './axiosInstance';

// --- Interfaces for UserAccountPage specific API calls (not the main UserDetails) ---
// Profile Update Request matches your form-data screenshot for /account/update
export interface UpdateProfileRequest {
  phone?: string;
  address?: string;
  country?: string;
  province?: string;
  district?: string;
  // name and company_name are NOT in the form-data from your screenshot for this specific endpoint.
  // If they need to be updated, confirm the API endpoint/payload for them.
}

export interface UpdateProfileResponse {
  message: string;
  // Backend might return updated user details, but screenshot showed only message.
  // user_details?: UserDetails; // If your API returns this, uncomment and import UserDetails
}

export interface AddEmailRequest {
  email: string;
}

export interface UpdateEmailRequest {
  id: number; // Email ID
  email: string; // New email address
}

export interface DeleteEmailRequest {
  id: number; // Email ID
}

export interface EmailActionResponse {
  message: string;
  // If your add email API returns the newly created email object, you'll need to define it here, e.g.:
  // data?: { id: number; user_id: string; email: string; /* other fields */ };
}

export interface UpdateCategoriesRequest {
  selected_categories: number[]; // Array of category IDs
}

export interface UpdateCategoriesResponse {
  message: string;
}


export const userAccountService = {
  /**
   * Updates user's profile information.
   * Based on your screenshot, this endpoint (/account/update) uses form-data
   * and handles phone, address, country, province, district.
   * @param data The fields to update.
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    try {
      const formData = new FormData();
      if (data.phone !== undefined) formData.append('phone', data.phone);
      if (data.address !== undefined) formData.append('address', data.address);
      if (data.country !== undefined) formData.append('country', data.country);
      if (data.province !== undefined) formData.append('province', data.province);
      if (data.district !== undefined) formData.append('district', data.district);

      const response = await axiosInstance.post<UpdateProfileResponse>('/account/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for FormData
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update Profile API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update profile.');
      }
      throw new Error('An unexpected error occurred during profile update.');
    }
  },

  /**
   * Adds a new notification email for the user.
   * @param data The email address to add.
   */
  addEmail: async (data: AddEmailRequest): Promise<EmailActionResponse> => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      const response = await axiosInstance.post<EmailActionResponse>('/email/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Add Email API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Maximum email count exceeded, Please active new payment');
      }
      throw new Error('An unexpected error occurred while adding email.');
    }
  },

  /**
   * Updates an existing notification email for the user.
   * @param data The email ID and new address.
   */
  updateEmail: async (data: UpdateEmailRequest): Promise<EmailActionResponse> => {
    try {
      const formData = new FormData();
      formData.append('id', String(data.id));
      formData.append('email', data.email);
      const response = await axiosInstance.post<EmailActionResponse>('/email/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update Email API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update email.');
      }
      throw new Error('An unexpected error occurred while updating email.');
    }
  },

  /**
   * Deletes a notification email for the user.
   * @param data The email ID to delete.
   */
  deleteEmail: async (data: DeleteEmailRequest): Promise<EmailActionResponse> => {
    try {
      const formData = new FormData();
      formData.append('id', String(data.id)); // Assuming delete also uses form-data with 'id'
      const response = await axiosInstance.post<EmailActionResponse>('/email/delete', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete Email API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to delete email.');
      }
      throw new Error('An unexpected error occurred while deleting email.');
    }
  },

  /**
   * Updates the user's preferred tender categories.
   * NOW SENDS AS selected_categories[] FOR EACH ID, AS CONFIRMED BY POSTMAN.
   * @param data An array of selected category IDs.
   */
  updateCategories: async (data: UpdateCategoriesRequest): Promise<UpdateCategoriesResponse> => {
    try {
      const formData = new FormData();
      // Loop through each ID and append it with the [] syntax
      data.selected_categories.forEach(id => {
        formData.append('selected_categories[]', String(id));
      });

      const response = await axiosInstance.post<UpdateCategoriesResponse>('/categories/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update Categories API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update categories.');
      }
      throw new Error('An unexpected error occurred while updating categories.');
    }
  },
};