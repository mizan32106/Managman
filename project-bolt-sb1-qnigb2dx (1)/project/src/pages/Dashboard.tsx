import React from 'react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare,
  Share2,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Pin
} from 'lucide-react';
import { useStore } from '../store';
import type { SocialPlatform } from '../types';

const Dashboard = () => {
  const analytics = useStore((state) => state.analytics);
  const scheduledPosts = useStore((state) => state.scheduledPosts);

  const stats = [
    { 
      label: 'Total Followers', 
      value: analytics?.followers.toLocaleString() || '0',
      icon: Users,
      trend: '+5.25%',
      color: 'bg-blue-500'
    },
    { 
      label: 'Engagement Rate', 
      value: `${analytics?.engagement_rate || 0}%`,
      icon: TrendingUp,
      trend: '+2.1%',
      color: 'bg-green-500'
    },
    { 
      label: 'Total Posts', 
      value: analytics?.total_posts.toLocaleString() || '0',
      icon: MessageSquare,
      trend: '+12.5%',
      color: 'bg-purple-500'
    },
    { 
      label: 'Total Interactions', 
      value: analytics?.total_interactions.toLocaleString() || '0',
      icon: Share2,
      trend: '+8.1%',
      color: 'bg-orange-500'
    }
  ];

  const platformIcons: Record<SocialPlatform, React.ElementType> = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    tiktok: Share2,
    linkedin: Linkedin,
    pinterest: Pin,
    threads: Share2,
    x: Twitter
  };

  const platformColors: Record<SocialPlatform, string> = {
    facebook: 'bg-blue-600',
    instagram: 'bg-pink-600',
    youtube: 'bg-red-600',
    twitter: 'bg-blue-400',
    tiktok: 'bg-black',
    linkedin: 'bg-blue-700',
    pinterest: 'bg-red-700',
    threads: 'bg-black',
    x: 'bg-black'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-500 text-sm font-medium">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Upcoming Posts</h2>
        <div className="space-y-4">
          {scheduledPosts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">
                  {new Date(post.scheduled_for).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="line-clamp-2">{post.content}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {post.platforms.map((platform) => {
                  const Icon = platformIcons[platform];
                  return (
                    <span
                      key={platform}
                      className={`p-2 rounded-lg ${platformColors[platform]}`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;