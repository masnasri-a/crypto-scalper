import { create } from 'zustand';

interface MenuState {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
}

const useMenuStore = create<MenuState>((set) => ({
    selectedMenu: 'home',
    setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));

export default useMenuStore;