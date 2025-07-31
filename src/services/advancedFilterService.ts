// src/services/advancedFilterService.ts
import axiosInstance from "./axiosInstance";

export interface AdvancedFilterParams {
  code?: string;
  searchParam?: string;
  publishedDate?: string;
  month?: string;
  year?: string;
  papers?: number[];   // ✅ newspapers come as array of IDs
}

export const advancedFilterService = {
  filterTenders: async (filters: AdvancedFilterParams) => {
    const params = new URLSearchParams();

    if (filters.code) params.append("code", filters.code);
    if (filters.searchParam) params.append("searchParam", filters.searchParam);
    if (filters.publishedDate) params.append("publishedDate", filters.publishedDate);
    if (filters.month) params.append("month", filters.month);
    if (filters.year) params.append("year", filters.year);
    if (filters.papers && filters.papers.length) {
      filters.papers.forEach(id => params.append("papers[]", id.toString()));
    }

    // ✅ Call API
    const res = await axiosInstance.get(`/tenders?${params.toString()}`);
    return res.data?.data || {};
  }
};
