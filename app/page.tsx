"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Instagram, FileText } from "lucide-react"
import VideoGallery from "@/components/video-gallery"
import type { VideoItem } from "@/types"

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro")
  const introRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Sample video data - replace with your actual videos
  const videos: VideoItem[] = [
    // AD Videos
    {
      id: "moksh-video",
      type: "youtube",
      title: "Video for Moksh",
      description: "Video for Moksh",
      videoId: "bao-XpfqI70", // Using one of the existing video IDs as placeholder
      orientation: "portrait",
      category: "AD VIDEOS",
    },
    {
      id: "youtube-1",
      type: "youtube",
      title: "Ad Video 1",
      description: "Commercial advertisement",
      videoId: "EvvR8aD9PVs",
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      index: 9,
      orientation: "portrait",
      category: "AD VIDEOS",
    },
    {
      id: "youtube-7",
      type: "youtube",
      title: "Tech Review",
      description: "RealmeVideo",
      videoId: "-TVa6UjYEdw",
      orientation: "portrait",
      category: "AD VIDEOS",
    },
    {
      id: "youtube-6",
      type: "youtube",
      title: "Realme Video",
      description: "Realme Video",
      videoId: "TtnmnCybrKs",
      orientation: "portrait",
      category: "AD VIDEOS",
    },

    // VLOGISH
    {
      id: "youtube-2",
      type: "youtube",
      title: "Ad Video 2",
      description: "Product showcase",
      videoId: "o7immgdRNTg",
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      index: 9,
      orientation: "portrait",
      category: "VLOGISH",
    },
    {
      id: "youtube-9",
      type: "youtube",
      title: "Tech News",
      description: "Industry updates",
      videoId: "2vrnZd0FzC4",
      orientation: "portrait",
      category: "VLOGISH",
    },

    {
      id: "youtube-8",
      type: "youtube",
      title: "Tech Tutorial",
      description: "How-to guide",
      videoId: "1jrs0ad8BVE",
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      orientation: "portrait",
      category: "VLOGISH",
    },

    //Misc
    // Instagram post in Misc category
    {
      id: "instagram-1",
      type: "instagram",
      title: "GHAR",
      description: "GHAR Storytelling Voiceover Video",
      postUrl: "https://www.instagram.com/p/DFZoS-1JpHh/",
      orientation: "portrait",
      category: "MISC",
    },
    {
      id: "instagram-2",
      type: "instagram",
      title: "9to5",
      description: "Nine To Five",
      // Updated to use the correct format for Instagram embeds
      postUrl: "https://www.instagram.com/p/DEIlZbEzuuy/",
      orientation: "portrait",
      category: "MISC",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      if (
        introRef.current &&
        scrollPosition >= introRef.current.offsetTop &&
        scrollPosition < (galleryRef.current?.offsetTop || Number.POSITIVE_INFINITY)
      ) {
        setActiveSection("intro")
      } else if (
        galleryRef.current &&
        scrollPosition >= galleryRef.current.offsetTop &&
        scrollPosition < (contactRef.current?.offsetTop || Number.POSITIVE_INFINITY)
      ) {
        setActiveSection("gallery")
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection("contact")
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/profile.png" alt="arrpanz logo" width={80} height={80} className="rounded-full" />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-gray-800 hover:text-orange-500 transition-colors">
              About
            </Link>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              Socials
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1-wbleXpKZSvU_RLbMAWdwsuGiFHDY1cl/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>View CV</span>
            </a>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-end gap-8">
          <button
            onClick={() => scrollToSection(introRef)}
            className={`flex items-center gap-2 ${activeSection === "intro" ? "text-orange-500" : "text-gray-400"}`}
          >
            <span className="font-bold">INTRO</span>
            {activeSection === "intro" && <div className="w-1 h-12 bg-orange-500"></div>}
          </button>
          <button
            onClick={() => scrollToSection(galleryRef)}
            className={`flex items-center gap-2 ${activeSection === "gallery" ? "text-orange-500" : "text-gray-400"}`}
          >
            <span className="font-bold">VIDEO GALLERY</span>
            {activeSection === "gallery" && <div className="w-1 h-12 bg-orange-500"></div>}
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className={`flex items-center gap-2 ${activeSection === "contact" ? "text-orange-500" : "text-gray-400"}`}
          >
            <span className="font-bold">CONTACT</span>
            {activeSection === "contact" && <div className="w-1 h-12 bg-orange-500"></div>}
          </button>
        </div>
      </div>

      {/* Intro Section */}
      <section ref={introRef} className="min-h-screen pt-32 pb-20 px-4 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <div className="text-orange-500 mb-4">HI MYSELF,</div>
          <h1 className="text-6xl md:text-8xl font-bold text-orange-500 mb-4">arrpanz</h1>
          <div className="text-xl text-gray-500 mb-6">ASPIRING FILMMAKER/VIDEO EDITOR</div>
          <div className="text-2xl text-gray-700 max-w-2xl space-y-4">
            <p>Hi, myself Arpan. I'm a Video Editor with over three years of professional experience.</p>
            <p>I will fuel your ideas and stories and bring it to life through editing.</p>
            <p>Please scroll to see some of my work.</p>
          </div>

          <div className="mt-8 animate-bounce">
            <ChevronDown className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section ref={galleryRef} className="min-h-screen bg-gray-50 py-20 px-4 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold mb-12">Video Gallery</h2>
        <VideoGallery videos={videos} />

        {/* Note about private videos */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> Some YouTube videos may be private and only visible to users who have been granted
            access.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="min-h-screen py-20 px-4 md:px-12 lg:px-20 flex flex-col items-center justify-center"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Contact</h2>
        <div className="max-w-xl w-full">
          <div className="text-center mb-8">
            <p className="text-xl mb-8">Interested in working together? Let's discuss your project!</p>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Email me at:</h3>
              <a
                href="mailto:wastiarpan7@gmail.com"
                className="text-2xl font-semibold text-orange-500 hover:text-orange-600 transition-colors"
              >
                wastiarpan7@gmail.com
              </a>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Follow me on Instagram:</h3>
                <a
                  href="https://www.instagram.com/arrpanz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="text-lg">@arrpanz</span>
                </a>

                <div className="mt-6">
                  <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-600 flex items-center justify-center">
                          <Instagram className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">@arrpanz</h3>
                          <p className="text-sm text-gray-500">Follow me on Instagram</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 text-center">
                      <a
                        href="https://www.instagram.com/arrpanz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                      >
                        <Instagram className="h-4 w-4" />
                        <span>View Profile</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://drive.google.com/file/d/1-wbleXpKZSvU_RLbMAWdwsuGiFHDY1cl/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md transition-colors font-medium"
            >
              <FileText className="h-5 w-5" />
              <span>View CV</span>
            </a>
          </div>

          {/* 
            CV Upload Section - Commented out for future implementation
            ============================================================
            
            To implement CV upload functionality:
            1. Create a server action to handle file uploads
            2. Add a form with file input and submit button
            3. Process the uploaded file on the server
            4. Store the file in a secure location
            
            Example implementation:
            
            <div className="mt-12 p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Upload New CV</h3>
              <form action={uploadCV}>
                <div className="mb-4">
                  <label htmlFor="cv-file" className="block text-sm font-medium text-gray-700 mb-2">
                    Select CV File (PDF, DOCX)
                  </label>
                  <input
                    type="file"
                    id="cv-file"
                    name="cv"
                    accept=".pdf,.docx,.html"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Upload New CV
                </button>
              </form>
            </div>
          */}
        </div>
      </section>
    </div>
  )
}
