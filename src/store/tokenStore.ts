import { create } from 'zustand';

type TLoadingStore = {
  token: string;
  setToken: (token: string) => void;
};

const useTokenStore = create<TLoadingStore>((set) => ({
  token: '',
  setToken: (token: string) => set({ token }),
}));

export default useTokenStore;
