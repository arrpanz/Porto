export type VideoOrientation = "landscape" | "portrait" | "square"

export interface BaseVideoItem {
  id: string
  title: string
  description: string
  orientation: VideoOrientation
  category?: string
}

export interface LocalVideoItem extends BaseVideoItem {
  type: "local"
  videoUrl: string
}

export interface YouTubeVideoItem extends BaseVideoItem {
  type: "youtube"
  videoId: string
  playlistId?: string
  index?: number
}

export interface InstagramVideoItem extends BaseVideoItem {
  type: "instagram"
  postUrl: string
}

export type VideoItem = LocalVideoItem | YouTubeVideoItem | InstagramVideoItem
