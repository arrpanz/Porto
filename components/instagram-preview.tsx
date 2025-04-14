"use client"
import { Instagram } from "lucide-react"

interface InstagramPreviewProps {
  username: string
}

export default function InstagramPreview({ username }: InstagramPreviewProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-600 flex items-center justify-center">
            <Instagram className="text-white h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">@{username}</h3>
            <p className="text-sm text-gray-500">Follow me on Instagram</p>
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
        <a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          <Instagram className="h-4 w-4" />
          <span>View Profile</span>
        </a>
      </div>
    </div>
  )
}
