"use client"

import { useState } from "react"

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  playlistId?: string
  index?: number
}

export default function YouTubeEmbed({
  videoId,
  title = "YouTube video player",
  playlistId,
  index,
}: YouTubeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Build the embed URL with any additional parameters
  let embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0`

  // Add playlist parameters if provided
  if (playlistId) {
    embedUrl += `&list=${playlistId}`
    if (index) embedUrl += `&index=${index}`
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
            <p className="text-gray-500">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        className="absolute inset-0 w-full h-full object-cover"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        style={{ border: "none" }}
      ></iframe>
    </div>
  )
}
