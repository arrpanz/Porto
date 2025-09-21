"use client"

import { useState, useEffect } from "react"

interface InstagramEmbedProps {
  postUrl: string
  title?: string
}

export default function InstagramEmbed({ postUrl, title = "Instagram post" }: InstagramEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [embedHtml, setEmbedHtml] = useState<string | null>(null)

  // Extract the post ID from the URL - improved to handle different URL formats
  const getPostId = (url: string) => {
    // Handle URLs like https://www.instagram.com/p/CODE/
    const standardMatch = url.match(/instagram\.com\/p\/([^/?]+)/)
    if (standardMatch) return standardMatch[1]

    // Handle URLs like https://www.instagram.com/reel/CODE/
    const reelMatch = url.match(/instagram\.com\/reel\/([^/?]+)/)
    if (reelMatch) return reelMatch[1]

    // Handle URLs that might have a different format
    const fallbackMatch = url.match(/([A-Za-z0-9_-]{11})/)
    return fallbackMatch ? fallbackMatch[1] : ""
  }

  const postId = getPostId(postUrl)

  // Create the embed URL with additional parameters
  const embedUrl = `https://www.instagram.com/p/${postId}/embed/captioned?cr=1&v=14&wp=540`

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Try to use the oEmbed API as a fallback
  useEffect(() => {
    if (!postId) return

    const fetchOembed = async () => {
      try {
        // This is a client-side only approach since we can't use the Instagram oEmbed API directly due to CORS
        // Instead, we'll use a simplified approach with the iframe
        setEmbedHtml(null)
      } catch (error) {
        console.error("Error fetching Instagram oEmbed:", error)
        setHasError(true)
      }
    }

    fetchOembed()
  }, [postId])

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

      {embedHtml ? (
        <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
      ) : (
        <iframe
          src={embedUrl}
          className="w-full h-full min-h-[450px]"
          title={title}
          onLoad={handleLoad}
          onError={handleError}
          allowtransparency="true"
          frameBorder="0"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      )}

      {/* Add a fallback link that's always visible but styled to be less prominent */}
      <div className="absolute bottom-2 right-2 z-10">
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/70 bg-black/30 px-2 py-1 rounded hover:bg-black/50 transition-colors"
        >
          View on Instagram
        </a>
      </div>
    </div>
  )
}
