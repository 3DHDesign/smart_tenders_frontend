// src/services/filter.ts
import axiosInstance from "./axiosInstance";

export interface TenderSearchResult {
  id: number;
  title: string;
  code: string;
  province: string;
  district: string;
  due_date: string;
  papers: { name: string }[];   // 👈 added
}

export const filterService = {
  searchTenders: async (query: string): Promise<TenderSearchResult[]> => {
    if (!query.trim()) return [];
    const res = await axiosInstance.get(`/tenders?searchParam=${encodeURIComponent(query)}`);
    return res.data?.data?.tenders?.data || [];
  }
};
