// src/services/api.ts
import axios from 'axios';
import { axiosInstance } from './axiosInstance';
import { type Tender } from './tenderService'; // --- CRITICAL FIX: Import Tender type from tenderService ---

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
  tenders: Tender[]; // --- CRITICAL FIX: Changed from 'any[]' to 'Tender[]' ---
}

export interface CategoriesResponse {
  status: string;
  code: number;
  data: {
    all: Category[][];
    user: Category[][];
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
      if (response.data.data.all && response.data.data.all.length > 0) {
          return response.data.data.all[0];
      }
      return [];
    } catch (err: unknown) {
      console.error('Get Categories API Error:', err);
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || 'Failed to fetch categories. Please try again.');
      }
      throw new Error('An unexpected error occurred while fetching categories.');
    }
  },

  /**
   * Fetches user-specific tender categories from the backend.
   * @returns A promise resolving to an array of Category objects for the user.
   */
  getUserCategories: async (): Promise<Category[]> => {
    try {
      const response = await axiosInstance.get<CategoriesResponse>('/categories');
      if (response.data.data.user && response.data.data.user.length > 0) {
          return response.data.data.user[0];
      }
      return [];
    } catch (err: unknown) {
      console.error('Get User Categories API Error:', err);
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || 'Failed to fetch user categories. Please try again.');
      }
      throw new Error('An unexpected error occurred while fetching user categories.');
    }
  },

  // Add other general API calls here
};