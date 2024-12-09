import { create } from "zustand";

type InfiniteScrollState = {
  data: unknown[];
  onInfiniteScroll: (newData: unknown[]) => void;
  onClearList: () => void;
};

export const useInfiniteScrollStore = create<InfiniteScrollState>((set) => ({
  data: [],
  onInfiniteScroll: (newData) =>
    set((state) => {
      const uniqueNewData = newData.filter(
        (item: any) =>
          !state.data.some((existingItem: any) => existingItem.id === item.id)
      );
      return { data: [...state.data, ...uniqueNewData] };
    }),
  onClearList: () => set({ data: [] }),
}));
