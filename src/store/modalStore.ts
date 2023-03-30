import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface Modal {
  modalOpen: boolean;
  setModalOpen: () => void;
}

const modalStore = create<Modal>()(
  devtools(
    persist(
      (set) => ({
        modalOpen: false,
        setModalOpen: () => set((state) => ({ modalOpen: !state.modalOpen })),
      }),
      { name: 'modal-storage' },
    ),
  ),
);

export default modalStore;
