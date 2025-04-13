import React, { useState } from 'react';
import { Calendar, Image as ImageIcon, Link, Type, Video, Clock, Hash, FileImage } from 'lucide-react';
import PlatformSelector from '../components/PlatformSelector';
import MediaUpload from '../components/MediaUpload';
import type { SocialPlatform } from '../types';

interface ContentMetadata {
  title: string;
  description: string;
  tags: string[];
  thumbnail?: File;
}

const Create = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [postType, setPostType] = useState<'post' | 'story' | 'reel'>('post');
  const [metadata, setMetadata] = useState<ContentMetadata>({
    title: '',
    description: '',
    tags: [],
    thumbnail: undefined,
  });
  const [tagInput, setTagInput] = useState('');

  const handlePlatformSelect = (platform: SocialPlatform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setMetadata(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!metadata.tags.includes(tagInput.trim())) {
        setMetadata(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const isValidContent = () => {
    if (postType === 'post') {
      return content.trim().length > 0 || files.length > 0;
    }
    return files.length > 0 && metadata.title.trim().length > 0;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Create Content</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Platforms
          </label>
          <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            onSelect={handlePlatformSelect}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type
          </label>
          <div className="flex space-x-4">
            {[
              { id: 'post', label: 'Post', icon: ImageIcon },
              { id: 'story', label: 'Story', icon: Clock },
              { id: 'reel', label: 'Reel', icon: Video }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setPostType(type.id as typeof postType)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  postType === type.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-5 h-5 mr-2" />
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={metadata.title}
            onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter a title for your content"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={metadata.description}
            onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add a description..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <Hash className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add tags (press Enter to add)"
              />
            </div>
            {metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media
          </label>
          <MediaUpload
            files={files}
            onFilesAdded={handleFilesAdded}
            onFileRemove={handleFileRemove}
          />
        </div>

        {files.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Thumbnail
            </label>
            <div className="flex items-center space-x-4">
              {metadata.thumbnail && (
                <div className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(metadata.thumbnail)}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setMetadata(prev => ({ ...prev, thumbnail: undefined }))}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex-1">
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                  <div className="flex flex-col items-center">
                    <FileImage className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload custom thumbnail</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Caption
            </label>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Type className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Link className="w-5 h-5" />
              </button>
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Write your ${postType} caption here...`}
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule
          </button>
          <div className="space-x-3">
            <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Save as Draft
            </button>
            <button 
              className={`px-4 py-2 text-white rounded-lg ${
                selectedPlatforms.length > 0 && isValidContent()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={selectedPlatforms.length === 0 || !isValidContent()}
            >
              Post Now
            </button>
          </div>
        </div>
      </div>

      {files.length > 0 && selectedPlatforms.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedPlatforms.map(platform => (
              <div key={platform} className="border rounded-lg p-4">
                <h3 className="font-medium mb-3 capitalize">{platform} Preview</h3>
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                  {metadata.thumbnail ? (
                    <img
                      src={URL.createObjectURL(metadata.thumbnail)}
                      alt="Custom thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : files[0]?.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(files[0])}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(files[0])}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>
                {metadata.title && (
                  <h4 className="font-medium text-lg mb-2">{metadata.title}</h4>
                )}
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                  {metadata.description || content}
                </p>
                {metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {metadata.tags.map(tag => (
                      <span key={tag} className="text-sm text-blue-600">#{tag} </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;