"use client"

import { VideoBox } from "@/components/video-box"
import type { VideoItem } from "@/types"

interface VideoGalleryProps {
  videos: VideoItem[]
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video) => (
        <VideoBox key={video.id} video={video} />
      ))}
    </div>
  )
}
