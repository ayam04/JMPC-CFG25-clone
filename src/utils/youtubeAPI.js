const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const searchYoutubeVideos = async (query) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${query}&part=snippet&type=video&maxResults=10`
        );
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error searching YouTube:', error);
        return [];
    }
};

export const getVideoDuration = async (videoId) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const duration = data.items[0].contentDetails.duration;
            return duration; // ISO 8601 duration format (e.g., "PT5M30S")
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error getting video duration for ${videoId}:`, error);
        return null;
    }
};