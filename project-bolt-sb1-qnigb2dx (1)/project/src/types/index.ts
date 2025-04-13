export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export type SocialPlatform = 
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'youtube'
  | 'tiktok'
  | 'linkedin'
  | 'pinterest'
  | 'threads'
  | 'x';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  connected: boolean;
  profileUrl?: string;
  followers?: number;
  avatar?: string;
}

export interface ScheduledPost {
  id: string;
  content: string;
  media_urls: string[];
  platforms: SocialPlatform[];
  scheduled_for: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  platformSpecificData?: {
    youtube?: {
      title: string;
      description: string;
      tags: string[];
      category: string;
    };
    instagram?: {
      caption: string;
      location?: string;
      firstComment?: string;
    };
    tiktok?: {
      description: string;
      challenges: string[];
      duetEnabled: boolean;
    };
    facebook?: {
      privacy: 'public' | 'friends' | 'private';
      allowComments: boolean;
    };
  };
}

export interface Analytics {
  followers: number;
  engagement_rate: number;
  total_posts: number;
  total_interactions: number;
  platformMetrics: {
    [key in SocialPlatform]?: {
      followers: number;
      engagement: number;
      posts: number;
      views?: number;
      likes?: number;
      comments?: number;
      shares?: number;
    };
  };
}

export interface PlatformSettings {
  platform: SocialPlatform;
  enabled: boolean;
  autoPost: boolean;
  bestTimeToPost: string[];
  hashtagGroups?: string[][];
  defaultPrivacy?: string;
  crossPosting?: SocialPlatform[];
}