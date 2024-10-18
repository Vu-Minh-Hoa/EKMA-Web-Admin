/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { IOption } from '../types/interface';

type TAcademyStore = {
  departments: IOption[];
  setDepartments: (departments: IOption[]) => void;
};

const useAcademyStore = create<TAcademyStore>((set) => ({
  departments: [{ id: 0, label: '' }],
  setDepartments: (departments: IOption[]) => set({ departments }),
}));

export default useAcademyStore;
