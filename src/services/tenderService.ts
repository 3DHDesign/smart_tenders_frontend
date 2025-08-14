// src/services/tenderService.ts
import axiosInstance from './axiosInstance';

export interface Tender {
  id: number;
  title: string;
  code: string;
  date: string;
  due_date: string;
  province: string | null;
  district: string | null;
  english_tender_url: string | null;
  sinhala_tender_url: string | null;
  url: string | null;
  description: string | null;
  status: string;
  intro: string | null;
  keywords: string;
  document_url: string | null;
  type: 'Tender' | 'Amendment' | 'Cancellation'; 
  categories?: { id: number; name: string; }[]; // Ensure categories is part of Tender interface
  papers?: { id: number; name: string; }[]; // Ensure papers is part of Tender interface
  files?: { id: number; tender_id: string; title: string; type: string; file: string; extension: string | null; created_at: string; updated_at: string; }[]; // And files
}

export interface TenderApiResponse {
  tenders: { data: Tender[]; current_page: number; last_page: number; total: number };
  tender_count: { today: number; live: number; closed: number; all: number; }; // Ensure 'all' is here if counts uses it
  by_province: { province: string; total: number; districts: { district: string; total: number }[] }[];
  by_Category: { id: number; name: string; tender_count: number }[]; // Ensure id and tender_count are here
}

interface SingleTenderApiResponse {
  status: string;
  code: number;
  data: {
    tender: Tender;
  };
}

export const getTenders = (
  page = 1,
  params: Record<string, string | number | undefined> = {}
) =>
  axiosInstance
    .get<{ data: TenderApiResponse }>('/tenders', { params: { page, ...params } })
    .then(r => r.data.data);


export const getTenderById = (id: number) =>
  axiosInstance
    .get<SingleTenderApiResponse>(`/tenders/${id}/view`)
    .then(r => {
      // console.log('Axios response.data for single tender:', r.data); // Keep for debugging if needed
      return r.data.data.tender;
    });