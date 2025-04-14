"use client"
import { VideoBox } from "@/components/video-box"
import type { VideoItem } from "@/types"

interface VideoGalleryProps {
  videos: VideoItem[]
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  // Group videos by category
  const videosByCategory: Record<string, VideoItem[]> = {}

  videos.forEach((video) => {
    const category = video.category || "Other Videos"
    if (!videosByCategory[category]) {
      videosByCategory[category] = []
    }
    videosByCategory[category].push(video)
  })

  // Get all categories
  const categories = Object.keys(videosByCategory)

  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <div key={category} className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videosByCategory[category].map((video) => (
              <VideoBox key={video.id} video={video} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
