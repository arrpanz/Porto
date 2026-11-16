"use client"

import { useEffect } from "react"

// Plays the logo's intro (big ball drops, shrinks into the full stop, the "a" rolls out) in the browser tab once
// per page load, then hands back to the static favicon, which is the animation's last frame.
// Frames live side by side in /favicon-intro.png (built by ~/my-video/arrpanz-logo/make_favicon.py).
const SPRITE = "/favicon-intro.png"
const SIZE = 64
const FRAMES = 47
const FRAME_MS = 40

export default function FaviconIntro() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'))
    if (!links.length) return
    const original = links.map((l) => l.getAttribute("href") ?? "")
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let timer = 0
    let frame = 0
    let done = false
    const restore = () => {
      done = true
      window.clearTimeout(timer)
      links.forEach((l, i) => l.setAttribute("href", original[i]))
    }
    const sprite = new Image()
    const step = () => {
      if (done) return
      if (frame >= FRAMES || document.hidden) return restore()
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.drawImage(sprite, frame * SIZE, 0, SIZE, SIZE, 0, 0, SIZE, SIZE)
      const url = canvas.toDataURL("image/png")
      links.forEach((l) => l.setAttribute("href", url))
      frame += 1
      timer = window.setTimeout(step, FRAME_MS)
    }
    const start = () => {
      if (document.hidden) return // wait until the tab is in front, or it would crawl in a background tab
      document.removeEventListener("visibilitychange", start)
      step()
    }
    sprite.onload = () => {
      if (done) return
      document.addEventListener("visibilitychange", start)
      start()
    }
    sprite.src = SPRITE

    return () => {
      document.removeEventListener("visibilitychange", start)
      restore()
    }
  }, [])

  return null
}
