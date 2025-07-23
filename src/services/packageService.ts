// src/services/packageService.ts
import axios from 'axios';
import { axiosInstance } from './axiosInstance'; // Ensure this path is correct

// Define the type for a single package object as returned by your API
export interface Package {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  intro: string | null;
  description: string | null;
  price: string; // Price might come as a string (e.g., "15,000/-")
  duration: string; // e.g., "1 Year"
  status: string;
  created_at: string;
  updated_at: string;
  created_at_human: string;
  features?: { text: string; included: boolean; }[];
}

// Define the structure of the API response for packages
// Corrected to reflect the nested 'packages' array
export interface PackagesResponse {
  status: string;
  code: number;
  data: { // <--- Added 'data' object here
    packages: Package[]; // <--- Added 'packages' array inside 'data'
  };
}

export const packageService = {
  /**
   * Fetches all pricing packages from the backend.
   * @returns A promise resolving to an array of Package objects.
   */
  getPackages: async (): Promise<Package[]> => {
    try {
      const response = await axiosInstance.get<PackagesResponse>('/packages');
      // <--- CRITICAL FIX HERE: Access response.data.data.packages --->
      // The array of package objects is nested under 'data.packages'
      return response.data.data.packages;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Get Packages API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch packages. Please try again.');
      }
      console.error('Unexpected error during getPackages:', error);
      throw new Error('An unexpected error occurred while fetching packages.');
    }
  },
};