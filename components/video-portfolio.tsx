"use client"

import { useState } from "react"
import { VideoCard } from "@/components/video-card"
import type { VideoItem } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VideoPortfolioProps {
  videos: VideoItem[]
}

export default function VideoPortfolio({ videos }: VideoPortfolioProps) {
  const [filter, setFilter] = useState<string>("all")

  // Extract unique tags from all videos
  const allTags = Array.from(new Set(videos.flatMap((video) => video.tags)))

  // Filter videos based on selected tag
  const filteredVideos = filter === "all" ? videos : videos.filter((video) => video.tags.includes(filter))

  return (
    <div className="space-y-8">
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          {allTags.map((tag) => (
            <TabsTrigger key={tag} value={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
