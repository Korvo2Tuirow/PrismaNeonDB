import { create } from "zustand";

type StatusPostStore = {
  upload: boolean;
  setUpload: (upload: boolean) => void;
};

export const useStatusStore = create<StatusPostStore>((set) => ({
  upload: false, // Estado inicial
  setUpload: (upload) => set({ upload }), // Atualiza o estado
}));
