// src/services/detailsService.ts
import axiosInstance from "./axiosInstance";

export interface DetailItem {
  id: number;
  title: string;
  type: string;
  intro?: string | null;
  description: string;
}

export const getDetails = async () => {
  const res = await axiosInstance.get("/details");
  return res.data.data;
};
