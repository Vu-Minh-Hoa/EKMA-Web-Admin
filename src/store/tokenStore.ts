import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ITokenState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useTokenStore = create(
  persist<ITokenState>(
    (set) => ({
      token: '',
      setToken: (token) => set({ token }),
    }),
    {
      name: 'token', // name of the item in the storage (must be unique)
    },
  ),
)

export default useTokenStore;
