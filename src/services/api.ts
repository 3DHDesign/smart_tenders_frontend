// src/services/api.ts
import axios from 'axios';
import { axiosInstance } from './axiosInstance'; // Ensure this path is correct

// Define the type for a single category object as returned by your API
export interface Category {
  id: number;
  name: string;
  status: string;
  slug: string;
  icon: string;
  intro: string | null;
  created_at: string;
  updated_at: string;
  created_at_human: string;
  icon_url: string;
  tender_count: number;
  tenders: any[]; // You might want to define a more specific type for tenders if needed
}

// --- CRITICAL FIX: CategoriesResponse MUST EXACTLY match the API's JSON structure ---
export interface CategoriesResponse {
  status: string;
  code: number;
  data: {
    all: Category[][]; // <--- CRITICAL: 'all' is an array of arrays of Category!
    user: Category[][]; // Assuming 'user' also has the same nesting
  };
}

export const apiService = {
  /**
   * Fetches all tender categories from the backend.
   * @returns A promise resolving to an array of Category objects.
   */
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await axiosInstance.get<CategoriesResponse>('/categories');
      // --- CRITICAL FIX: Access the first element of the 'all' array, which is the actual array of categories ---
      // This will now correctly extract the array of 26 categories.
      if (response.data.data.all && response.data.data.all.length > 0) {
          return response.data.data.all[0]; // Get the first (and likely only) inner array
      }
      return []; // Return an empty array if 'all' is empty or not as expected
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Get Categories API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch categories. Please try again.');
      }
      console.error('Unexpected error during getCategories:', error);
      throw new Error('An unexpected error occurred while fetching categories.');
    }
  },

  // Add other general API calls here
};