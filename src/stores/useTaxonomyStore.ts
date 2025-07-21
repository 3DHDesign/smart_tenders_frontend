/* ----------  src/stores/useTaxonomyStore.ts  ---------- */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getTenders } from '../services/tenderService';

type ApiShape = Awaited<ReturnType<typeof getTenders>>;

interface TaxState {
  byProvince: ApiShape['by_province'];
  byCategory: ApiShape['by_Category'];
  loaded: boolean;
  load: () => Promise<void>;
}

export const useTaxonomyStore = create<TaxState>()(
  devtools((set) => ({
    byProvince: [],
    byCategory: [],
    loaded: false,

    load: async () => {
      try {
        const data = await getTenders(1);
        set({
          byProvince: data.by_province || [],
          byCategory: data.by_Category || [],
          loaded: true,
        });
      } catch (err) {
        console.error("Failed to load taxonomies", err);
      }
    },
  }))
);
