import axios from 'axios';


const LUW_API_KEY = 'sk-9SFLqzz1wAzwscZD3AFW4usGBB2JVdbr';
const LWG = 6003
const IMAGE = 6246 // Temporarily use same board as videos to test



export const getVideos = async () => {
  try {
    const response = await axios.get(
      `https://api.luw.ai/v2/boards/${LWG}/folders`,
      {
        headers: { Authorization: `Bearer ${LUW_API_KEY}` },
        timeout: 10000,
      }
    );
    console.log("Videos response:", response.data);
    
    // Extract videos from the folders structure
    if (response.data && response.data.folders && response.data.folders.length > 0) {
      const folder = response.data.folders[0];
      if (folder.media && folder.media.length > 0) {
        // Filter only .mp4 files
        const videos = folder.media
          .filter(media => media.url && media.url.endsWith('.mp4'))
          .map(media => ({
            id: media.id.toString(),
            url: media.url,
            title: media.extras ? JSON.parse(media.extras).prompt || 'Untitled' : 'Untitled'
          }));
        
        console.log("Filtered videos:", videos);
        return videos;
      }
    }
    
    return [];
  } catch (error) {
    console.error('🔴 Videos fetch error:', error.response?.data || error.message);
    throw error;
  }
} 

export const getImages = async () => {
  try {
    console.log(`🟡 Fetching images from board ID: ${IMAGE}`);
    const response = await axios.get(
      `https://api.luw.ai/v2/boards/${IMAGE}/folders`,
      {
        headers: { Authorization: `Bearer ${LUW_API_KEY}` },
        timeout: 10000,
      }
    );
    console.log("🟢 Images API response:", response.data);
    console.log("🟢 Response status:", response.status);
    
    // Extract images from the folders structure
    if (response.data && response.data.folders && response.data.folders.length > 0) {
      const folder = response.data.folders[0];
      console.log("🟢 First folder:", folder);
      console.log("🟢 Media count in folder:", folder.media?.length || 0);
      
      if (folder.media && folder.media.length > 0) {
        // Filter image files (jpg, jpeg, png, webp, gif)
        const images = folder.media
          .filter(media => {
            if (!media.url) return false;
            const url = media.url.toLowerCase();
            return url.endsWith('.jpg') || url.endsWith('.jpeg') || 
                   url.endsWith('.png') || url.endsWith('.webp') || 
                   url.endsWith('.gif');
          })
          .map(media => ({
            id: media.id.toString(),
            url: media.url,
            title: media.extras ? JSON.parse(media.extras).prompt || 'Untitled' : 'Untitled',
            style: extractStyleFromPrompt(media.extras),
            type: extractTypeFromPrompt(media.extras)
          }));
        
        console.log("Filtered images:", images);
        return images;
      }
    }
    
    return [];
  } catch (error) {
    console.error('🔴 Images fetch error:', error.response?.data || error.message);
    throw error;
  }
}

// Helper functions to extract style and type from prompt
const extractStyleFromPrompt = (extras) => {
  if (!extras) return 'Unknown';
  try {
    const parsed = JSON.parse(extras);
    const prompt = parsed.prompt || '';
    
    // Simple style detection based on keywords
    const styleKeywords = {
      'Traditional': ['traditional', 'classic', 'old school'],
      'Realistic': ['realistic', 'photorealistic', 'detailed'],
      'Minimalist': ['minimalist', 'simple', 'clean'],
      'Geometric': ['geometric', 'geometric pattern'],
      'Tribal': ['tribal', 'polynesian', 'maori'],
      'Watercolor': ['watercolor', 'colorful', 'splash'],
      'Gothic': ['gothic', 'dark', 'black'],
      'Script': ['script', 'text', 'writing', 'lettering']
    };
    
    for (const [style, keywords] of Object.entries(styleKeywords)) {
      if (keywords.some(keyword => prompt.toLowerCase().includes(keyword))) {
        return style;
      }
    }
    
    return 'Artistic';
  } catch {
    return 'Unknown';
  }
};

const extractTypeFromPrompt = (extras) => {
  if (!extras) return 'Image';
  try {
    const parsed = JSON.parse(extras);
    const prompt = parsed.prompt || '';
    
    // Detect if it's text/font based
    const textKeywords = ['text', 'lettering', 'script', 'font', 'writing', 'word', 'name'];
    if (textKeywords.some(keyword => prompt.toLowerCase().includes(keyword))) {
      return 'Font';
    }
    
    return 'Image';
  } catch {
    return 'Image';
  }
}; 