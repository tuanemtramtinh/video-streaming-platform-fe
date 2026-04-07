import type { ISection } from "@/types/section.type";
import { create } from "zustand";

interface SectionState {
  sections: ISection[];
  section: ISection | null;

  setSection: (section: ISection) => void;
  clearSection: () => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: [],
  section: null,
  setSection: (section) => set({ section }),
  clearSection: () => set({ section: null }),
}));
