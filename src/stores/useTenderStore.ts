// src/stores/useTenderStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTenders } from '../services/tenderService';
import type { Tender } from '../services/tenderService';

type Filters = Partial<Omit<Record<string, string | number | undefined>, 'page'>>;

interface State {
  list: Tender[];
  counts: { all: number; today: number; live: number; closed: number };
  page: number;
  lastPage: number;
  loading: boolean;
  error: string | null;
  cachedAt?: number;
  filters: Filters;
  fetchPage: (page?: number, reset?: boolean) => Promise<void>;
  setFilters: (f: Filters) => void;
}

const THIRTY_MIN = 30 * 60_000;

export const useTenderStore = create<State>()(
  persist(
    (set, get) => ({
      list: [],
      counts: { all: 0, today: 0, live: 0, closed: 0 },
      page: 1,
      lastPage: 1,
      loading: false,
      error: null,
      filters: {},
      cachedAt: undefined,

      fetchPage: async (page = 1, reset = true) => {
        // console.log('--- fetchPage called ---'); // You can re-enable these for debugging if needed
        // console.log('1. Requested page (argument):', page);
        // console.log('2. Current filters (from store.get()):', get().filters);
        // console.log('3. Current page state (from store.get()):', get().page);

        if (get().loading) return;
        if (!reset && Date.now() - (get().cachedAt ?? 0) < THIRTY_MIN) return;

        set({ loading: true, error: null });

        try {
          const filtersFromStore = get().filters;
          const paramsToSend: Record<string, string | number | undefined> = {};

          for (const key in filtersFromStore) {
            if (key !== 'page' && filtersFromStore[key] !== undefined && filtersFromStore[key] !== null) {
              paramsToSend[key] = filtersFromStore[key];
            }
          }
          paramsToSend.page = page;

          const d = await getTenders(page, paramsToSend);

          set({
            list: reset ? d.tenders.data : [...get().list, ...d.tenders.data],
            counts: {
              all: d.tenders.total,
              today: d.tender_count.today,
              live: d.tender_count.live,
              closed: d.tender_count.closed,
            },
            page,
            lastPage: d.tenders.last_page,
            loading: false,
            cachedAt: Date.now(),
          });
        } catch (err) {
          set({
            loading: false,
            error:
              err instanceof Error ? err.message : 'Failed to load tenders',
          });
        }
      },

      setFilters: (f: Partial<Record<string, string | number | undefined>>) => {
        const newFilters = { ...get().filters, ...f };
        if ('page' in newFilters) {
          delete newFilters.page;
        }
        set({ filters: newFilters, page: 1 });
        get().fetchPage(1, true);
      },
    }),
    {
      name: 'tender-store',
      partialize: (s) => ({
        filters: s.filters,
        list: s.page === 1 ? s.list : [],
        counts: s.counts,
        lastPage: s.lastPage,
        cachedAt: s.cachedAt,
        page: s.page, // THIS LINE IS ESSENTIAL FOR PAGINATION
      }),
    }
  )
);