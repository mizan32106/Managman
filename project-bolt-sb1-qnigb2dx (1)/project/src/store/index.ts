import { create } from 'zustand';
import type { User, SocialAccount, ScheduledPost, Analytics } from '../types';

interface AppState {
  user: User | null;
  socialAccounts: SocialAccount[];
  scheduledPosts: ScheduledPost[];
  analytics: Analytics | null;
  setUser: (user: User | null) => void;
  setSocialAccounts: (accounts: SocialAccount[]) => void;
  setScheduledPosts: (posts: ScheduledPost[]) => void;
  setAnalytics: (analytics: Analytics | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  socialAccounts: [],
  scheduledPosts: [],
  analytics: null,
  setUser: (user) => set({ user }),
  setSocialAccounts: (socialAccounts) => set({ socialAccounts }),
  setScheduledPosts: (scheduledPosts) => set({ scheduledPosts }),
  setAnalytics: (analytics) => set({ analytics }),
}));