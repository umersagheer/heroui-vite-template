import { create } from "zustand";

type LayoutState = {
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
};
type LayoutActions = {
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  setIsMobileSidebarOpen: (value: boolean) => void;
};

type LayoutStore = LayoutState & LayoutActions;

const initialState: LayoutState = {
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  ...initialState,

  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (value) => set({ isSidebarCollapsed: value }),
  setIsMobileSidebarOpen: (value) => set({ isMobileSidebarOpen: value }),
}));
