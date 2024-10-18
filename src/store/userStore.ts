/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

const useUserStore = create<any>((set) => ({
  userStore: {},
  setUserInfo: (userStore: any) => set({ userStore }),
}));

export default useUserStore;
