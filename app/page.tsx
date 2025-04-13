"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import VideoGallery from "@/components/video-gallery"
import type { VideoItem } from "@/types"

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro")
  const introRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Sample video data - replace with your actual videos
  const videos: VideoItem[] = [
    // YouTube video - Private Work
    {
      id: "youtube-1",
      type: "youtube",
      title: "Private Work",
      description: "From my private collection",
      
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      index: 11,
      orientation: "portrait", // Use the correct aspect ratio for your video
    },
    {
      id: "youtube-2",
      type: "youtube",
      title: "Private Work",
      description: "From my private collection",
      videoId: "Dw8BRAAaQSY",
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      index: 3,
      orientation: "portrait", // Use the correct aspect ratio for your video
    },
    
    {
      id: "youtube-3",
      type: "youtube",
      title: "Private Work",
      description: "From my private collection",
      videoId: "o7immgdRNTg",
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      index: 9,
      orientation: "portrait", // Use the correct aspect ratio for your video
    },
    {
      id: "youtube-8",
      type: "youtube",
      title: "Private Work",
      description: "year2022",
      videoId: "qJgj8YXsLKk",
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      index: 3,
      orientation: "landscape", // Use the correct aspect ratio for your video
    },
    {
      id: "youtube-9",
      type: "youtube",
      title: "Private Work",
      description: "space",
      videoId: "1jrs0ad8BVE",
      playlistId: "PLxUXKzH1-IUAIAE0F7ow8IW8J-sn_a042",
      orientation: "landscape", // Use the correct aspect ratio for your video
    },
    {
      id: "youtube-11",
      type: "youtube",
      title: "Private Work",
      description: "space",
      videoId: "2vrnZd0FzC4",
      orientation: "landscape", // Use the correct aspect ratio for your video
    },
    
    {
      id: "youtube-5",
      type: "youtube",
      title: "Private Work",
      description: "titanShortGIN",
      videoId: "SVFLiyTvjZE",
      orientation: "portrait", // Use the correct aspect ratio for your video
    },
    {
      id: "youtube-6",
      type: "youtube",
      title: "Private Work",
      description: "titanShortGIN",
      videoId: "TtnmnCybrKs",
      orientation: "portrait", // Use the correct aspect ratio for your video
    },
     {
      id: "youtube-7",
      type: "youtube",
      title: "Private Work",
      description: "titanShortGIN",
      videoId: "-TVa6UjYEdw?sttick=0",
      orientation: "portrait", // Use the correct aspect ratio for your video
    },
   

    
    



    // Note: For YouTube videos, set the orientation to match the actual video:
    // - Most YouTube videos are "landscape" (16:9)
    // - Vertical videos should be "portrait" (9:16)
    // - Square videos should be "square" (1:1)
    // Local videos - using public video URLs that are directly playable
   // {
    //  id: "local-1",
    //  type: "local",
    //  title: "Cinematic Drone Shot",
    //  description: "Aerial view of coastal landscape",
    //  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
   //   orientation: "landscape",
   // },
    
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
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="arrpanz logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-gray-800 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="#feature" className="text-gray-800 hover:text-orange-500 transition-colors">
              Feature
            </Link>
            <Link href="#pricing" className="text-gray-800 hover:text-orange-500 transition-colors">
              Pricing
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-800 hover:text-orange-500 transition-colors">
                Resources <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-40">
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-md">
                  Resource 1
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-md">
                  Resource 2
                </Link>
              </div>
            </div>
            <Link href="#socials" className="text-orange-500 hover:text-orange-600 transition-colors">
              Socials
            </Link>
          </nav>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors">
            Contact Me
          </button>
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
          <div className="text-xl text-gray-500 mb-6">ASPIRING VIDEO EDITOR</div>
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
      <section ref={contactRef} className="min-h-screen py-20 px-4 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold mb-12">Contact</h2>
        <div className="max-w-xl">
          <p className="text-xl mb-8">Interested in working together? Let's discuss your project!</p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Tell me about your project"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
