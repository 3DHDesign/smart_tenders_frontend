// src/services/testimonials.ts

import axiosInstance from "./axiosInstance";

// Define the shape of a single testimonial object
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  created_at_human: string;
}

// Define the shape of the API response
interface TestimonialsApiResponse {
  status: string;
  code: number;
  testimonials: Testimonial[];
}

/**
 * Fetches the list of active testimonials from the API.
 * @returns {Promise<Testimonial[]>} A promise that resolves with an array of testimonials.
 * @throws {Error} If the API call fails or the response structure is unexpected.
 */
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await axiosInstance.get<TestimonialsApiResponse>("/testimonials");
    
    // Check if the response is successful and contains the testimonials array
    if (response.data && response.data.status === "success" && Array.isArray(response.data.testimonials)) {
      return response.data.testimonials;
    } else {
      throw new Error("Invalid API response format for testimonials.");
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw new Error("Failed to fetch testimonials. Please try again later.");
  }
};