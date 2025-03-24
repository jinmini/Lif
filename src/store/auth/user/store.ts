'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserType = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  reset: () => void;
}


export const useUserStore = create<UserType>()(
  persist(
    (set) => ({
      user_id: '',
      name: '',
      email: '',
      password: '',
      reset: () => set({ user_id: '', name: '', email: '', password: '' }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
