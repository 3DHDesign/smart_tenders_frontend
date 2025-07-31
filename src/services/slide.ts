// src/services/slideService.ts
import axios from 'axios';
import { axiosInstance } from './axiosInstance'; // Ensure this path is correct

// Define the type for a single slide object as returned by your API
export interface Slide {
  id: number;
  title: string; // Maps to headline
  intro: string; // Maps to subtitle
  link: string;
  image: string; // Relative path
  mobile_image: string | null; // Relative path
  status: string;
  created_at: string;
  updated_at: string;
  image_url: string; // Absolute URL for desktop image
  mobile_image_url: string | null; // Absolute URL for mobile image
  created_at_human: string;
}

// Define the structure of the API response for slides
export interface SlidesResponse {
  status: string;
  code: number;
  slide: Slide[]; // The array of slide objects is directly under 'slide'
}

export const slideService = {
  /**
   * Fetches all hero slides from the backend.
   * @returns A promise resolving to an array of Slide objects.
   */
  getSlides: async (): Promise<Slide[]> => {
    try {
      const response = await axiosInstance.get<SlidesResponse>('/slide'); // Endpoint is /slide
      return response.data.slide; // Extract the 'slide' array
    } catch (err: unknown) { // Use unknown for catch error
      console.error('Get Slides API Error:', err);
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || 'Failed to fetch slides.');
      }
      throw new Error('An unexpected error occurred while fetching slides.');
    }
  },
};