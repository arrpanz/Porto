"use client"

import { useState } from "react"

interface InstagramEmbedProps {
  postUrl: string
  title?: string
}

export default function InstagramEmbed({ postUrl, title = "Instagram post" }: InstagramEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Extract the post ID from the URL
  const postId = postUrl.split("/p/")[1]?.split("/")[0] || ""

  // Create the embed URL
  const embedUrl = `https://www.instagram.com/p/${postId}/embed/captioned`

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg p-4">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Unable to load Instagram post</p>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 transition-colors"
          >
            View on Instagram
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
            <p className="text-gray-500">Loading Instagram post...</p>
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        className="w-full h-full min-h-[400px]"
        title={title}
        onLoad={handleLoad}
        onError={handleError}
        allowTransparency={true}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  )
}
