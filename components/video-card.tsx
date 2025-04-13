"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { VideoItem } from "@/types"
import { useMobile } from "@/hooks/use-mobile"

interface VideoCardProps {
  video: VideoItem
}

export function VideoCard({ video }: VideoCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMobile()

  const handleMouseEnter = () => {
    if (isMobile) return
    setIsHovering(true)
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.error("Error playing video:", e)
      })
      setIsPlaying(true)
    }
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    setIsHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const handleTouchStart = () => {
    if (!isMobile) return
    if (isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsPlaying(false)
      }
    } else {
      if (videoRef.current) {
        videoRef.current.play().catch((e) => {
          console.error("Error playing video:", e)
        })
        setIsPlaying(true)
      }
    }
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <div className="relative aspect-video">
        {!isHovering && !isPlaying ? (
          <Image
            src={video.thumbnailUrl || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover transition-opacity"
            priority
          />
        ) : null}
        <video
          ref={videoRef}
          src={video.videoUrl}
          className={`absolute inset-0 w-full h-full object-cover ${
            isHovering || isPlaying ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          loop
          preload="metadata"
        />
        {isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`bg-black/50 rounded-full p-3 transition-opacity ${isPlaying ? "opacity-0" : "opacity-100"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{video.title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{video.description}</p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
