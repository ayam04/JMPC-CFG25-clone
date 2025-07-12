'use client'; // Make sure this is here at the top!

import { useSearchParams, useRouter } from 'next/navigation'; // Changed from 'next/router'
import { useState, useEffect } from 'react';
import { searchYoutubeVideos, getVideoDuration } from '../../../../../utils/youtubeAPI'; // Adjusted import path
import VideoCard from '../../../../../components/VideoCard'; // Adjusted import path

// Define a functional component that accepts params and searchParams as props
function TopicVideos({ params, searchParams }) {
    const { standard, subject, topic } = params;
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            if (topic) {
                // Improved search query - EXACT FORMAT
                const searchQuery = `${topic} class ${standard} ${subject} marathi medium`;
                try {
                    const initialVideos = await searchYoutubeVideos(searchQuery);
                    const filteredVideos = [];
                    for (const video of initialVideos) {
                        try {
                            const duration = await getVideoDuration(video.id.videoId);
                            if (duration && isDurationGreaterThan(duration, 3)) {
                                filteredVideos.push(video);
                            }
                        } catch (durationError) {
                            console.error("Error getting duration for video:", video.id.videoId, durationError);
                            // Handle duration fetch error, e.g., skip this video
                        }
                    }
                    setVideos(filteredVideos);
                } catch (error) {
                    console.error('Error fetching videos:', error);
                }
            }
        };
        fetchVideos();
    }, [topic, standard, subject]);

    const handleSearch = async () => {
        const fetchVideos = async () => {
            // Improved search query for user searches - EXACT FORMAT
            const searchQuery = `${searchTerm} class ${standard} ${subject} marathi medium`;
            try {
                const initialVideos = await searchYoutubeVideos(searchQuery);
                const filteredVideos = [];
                for (const video of initialVideos) {
                    try {
                        const duration = await getVideoDuration(video.id.videoId);
                        if (duration && isDurationGreaterThan(duration, 3)) {
                            filteredVideos.push(video);
                        }
                    } catch (durationError) {
                        console.error("Error getting duration for video:", video.id.videoId, durationError);
                        // Handle duration fetch error, e.g., skip this video
                    }
                }
                setVideos(filteredVideos);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchVideos();
    };

    if (!topic) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white min-h-screen py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Videos for {decodeURIComponent(topic)} (Standard {standard}, Subject {subject})
                </h1>

                {/* Search Bar */}
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search for videos..."
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Search
                    </button>
                </div>

                {/* Video Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <VideoCard key={video.id.videoId} video={video} standard={standard} subject={subject} topic={topic} />
                    ))}
                </div>

                {videos.length === 0 && (
                    <p className="text-gray-500">No videos found. Please try a different search term.</p>
                )}
            </div>
        </div>
    );
}

// Helper function to check if duration is greater than a certain number of minutes
function isDurationGreaterThan(duration, minutes) {
    if (!duration) return false;

    const isoDurationRegex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const match = duration.match(isoDurationRegex);

    if (!match) return false;

    const hours = parseInt(match[1]) || 0;
    const mins = parseInt(match[2]) || 0;
    const secs = parseInt(match[3]) || 0;

    const totalMinutes = hours * 60 + mins + secs / 60;

    return totalMinutes >= minutes;
}

export default TopicVideos;