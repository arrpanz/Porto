"use client"

import { useState, useRef, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"
import type { VideoItem } from "@/types"
import YouTubeEmbed from "@/components/youtube-embed"
import InstagramEmbed from "@/components/instagram-embed"
import Image from "next/image"

interface VideoBoxProps {
  video: VideoItem
}

export function VideoBox({ video }: VideoBoxProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMobile()

  // Determine aspect ratio class based on orientation
  const aspectRatioClass =
    video.orientation === "portrait"
      ? "aspect-[9/16]"
      : video.orientation === "square"
        ? "aspect-square"
        : "aspect-video"

  // For Instagram videos, render the Instagram embed component
  if (video.type === "instagram") {
    return (
      <div className={`relative overflow-hidden rounded-lg ${aspectRatioClass}`}>
        <InstagramEmbed postUrl={video.postUrl} title={video.title} />
      </div>
    )
  }

  // For YouTube videos, render the YouTube embed component
  if (video.type === "youtube") {
    return (
      <div className={`relative overflow-hidden rounded-lg ${aspectRatioClass}`}>
        <div className="absolute inset-0">
          <YouTubeEmbed videoId={video.videoId} playlistId={video.playlistId} index={video.index} title={video.title} />
        </div>

        {/* Overlay for title and description */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <h3 className="text-white text-xl font-bold">{video.title}</h3>
          <p className="text-white/80 mt-1">{video.description}</p>
        </div>
      </div>
    )
  }

  // Handle video errors
  const handleVideoError = () => {
    console.error("Error loading video:", video.videoUrl)
    setVideoError(true)
  }

  // For local videos, handle hover play functionality
  const handleMouseEnter = () => {
    if (isMobile || videoError) return
    setIsHovering(true)
    if (videoRef.current) {
      videoRef.current.muted = false
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play with sound was prevented
          // Play muted instead
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch((e) => {
              console.error("Error playing muted video:", e)
              setVideoError(true)
            })
          }
        })
      }
    }
  }

  const handleMouseLeave = () => {
    if (isMobile || videoError) return
    setIsHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      videoRef.current.muted = true
    }
  }

  const handleClick = () => {
    if (!isMobile || videoError) return

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false
        videoRef.current.play().catch((e) => {
          // If autoplay with sound fails, try muted
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch((e) => {
              console.error("Error playing video:", e)
              setVideoError(true)
            })
          }
        })
        setIsHovering(true)
      } else {
        videoRef.current.pause()
        setIsHovering(false)
      }
    }
  }

  // Preload video to check if it's valid
  useEffect(() => {
    let isMounted = true // Add a flag to track component mount status
    let videoCheckTimeout: NodeJS.Timeout

    const checkVideo = async () => {
      if (video.type === "local" && video.videoUrl) {
        try {
          const response = await fetch(video.videoUrl, { method: "HEAD" })
          if (!response.ok && isMounted) {
            setVideoError(true)
          }
        } catch (error) {
          console.error("Error checking video:", error)
          if (isMounted) {
            setVideoError(true)
          }
        }
      }
    }

    // Delay the video check to avoid immediate checks on mount
    videoCheckTimeout = setTimeout(() => {
      checkVideo()
    }, 500)

    return () => {
      isMounted = false // Set the flag to false when the component unmounts
      clearTimeout(videoCheckTimeout) // Clear the timeout if the component unmounts
    }
  }, [video.videoUrl, video.type])

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${aspectRatioClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {videoError ? (
        // Fallback content when video can't be loaded
        <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center">
          <Image
            src={`/placeholder.svg?height=${video.orientation === "portrait" ? 1280 : 720}&width=${video.orientation === "portrait" ? 720 : 1280}`}
            alt={video.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
            <p className="text-center mb-2">{video.title}</p>
            <p className="text-xs text-center opacity-75">Video unavailable</p>
          </div>
        </div>
      ) : (
        // Video content
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          poster={`/placeholder.svg?height=${video.orientation === "portrait" ? 1280 : 720}&width=${video.orientation === "portrait" ? 720 : 1280}`}
          onError={handleVideoError}
        />
      )}

      {/* Overlay that appears on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-white text-xl font-bold">{video.title}</h3>
        <p className="text-white/80 mt-1">{video.description}</p>
      </div>
    </div>
  )
}
