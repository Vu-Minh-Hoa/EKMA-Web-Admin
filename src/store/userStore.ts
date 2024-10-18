/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type TUserStore = {
  userStore: any;
  setUserInfo: (userStore: any) => void;
};

const useUserStore = create<TUserStore>((set) => ({
  userStore: {},
  setUserInfo: (userStore: any) => set({ userStore }),
}));

export default useUserStore;
