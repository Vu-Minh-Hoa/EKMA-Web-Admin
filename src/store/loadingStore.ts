import { create } from 'zustand';

type TLoadingStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const useLoadingStore = create<TLoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export default useLoadingStore;
