import { create } from "zustand";

export type GroupStateProps = {
  id: string;
  name: string;
  category: string;
  createdAt: Date;
  htmlDescription: string | null;
  userId: string;
  thumbnail: string | null;
  description: string | null;
  privacy: "PUBLIC" | "PRIVATE";
  jsonDescription: string | null;
  gallery: string[];
};

export type PostStateProps = {
  id: string;
  createdAt: Date;
  title: string | null;
  htmlContent: string | null;
  jsonContent: string | null;
  content: string;
  authorId: string;
  likes: string[];
  comments: string[];
  channelId: string;
};

type SearchStore = {
  isSearching: boolean;
  status?: number;
  data: GroupStateProps[] | PostStateProps[];
  debounce: string;
  setIsSearching: (isSearching: boolean) => void;
  setData: (data: GroupStateProps[] | PostStateProps[]) => void;
  setStatus: (status: number | undefined) => void;
  setDebounce: (debounce: string) => void;
  clearSearch: () => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  isSearching: false,
  status: undefined,
  data: [],
  debounce: "",
  setIsSearching: (isSearching) => set({ isSearching }),
  setData: (data) => set({ data }),
  setStatus: (status) => set({ status }),
  setDebounce: (debounce) => set({ debounce }),
  clearSearch: () =>
    set({
      isSearching: false,
      status: undefined,
      data: [],
      debounce: "",
    }),
}));
