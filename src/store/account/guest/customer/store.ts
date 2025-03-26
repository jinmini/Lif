'use client';

import { create } from 'zustand';

export type UserType = {
    user_id: string;
    email: string;
    name: string;
    setUserInfo: (user_id: string, email: string, name: string) => void;
    reset: () => void;
}

export const useUserStore = create<UserType>((set) => ({
    user_id: '',
    email: '',
    name: '',
    setUserInfo: (user_id: string, email: string, name: string) => 
        set({ user_id, email, name }),
    reset: () => set({ user_id: '', email: '', name: '' }),
}));
