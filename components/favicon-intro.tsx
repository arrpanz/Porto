"use client"

import { useEffect } from "react"

// Plays the logo's intro (big ball drops, shrinks into the full stop, the "a" rolls out) in the browser tab, then
// rests on the static favicon, which is the animation's last frame. It replays every 10 s while the tab is in
// front, and straight away when the visitor comes back to the tab. Browsers throttle timers in background tabs,
// so it pauses there rather than crawl. Safari ignores favicon changes and just shows the static icon.
// Frames live side by side in /favicon-intro.png (built by ~/my-video/arrpanz-logo/make_favicon.py).
const SPRITE = "/favicon-intro.png"
const SIZE = 64
const FRAMES = 47
const FRAME_MS = 40
const LOOP_MS = 10_000 // a new play starts every 10 s

export default function FaviconIntro() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'))
    if (!links.length) return
    const original = links.map((l) => l.getAttribute("href") ?? "")
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = SIZE
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const urls: string[] = [] // frames as data URLs, made once on the first play
    let timer = 0
    let frame = 0
    let playing = false
    let stopped = false
    const showStatic = () => links.forEach((l, i) => l.setAttribute("href", original[i]))
    const sprite = new Image()

    const step = () => {
      if (stopped) return
      if (document.hidden) {
        playing = false
        return showStatic()
      }
      if (frame >= FRAMES) {
        playing = false
        showStatic()
        timer = window.setTimeout(play, LOOP_MS - FRAMES * FRAME_MS)
        return
      }
      if (!urls[frame]) {
        ctx.clearRect(0, 0, SIZE, SIZE)
        ctx.drawImage(sprite, frame * SIZE, 0, SIZE, SIZE, 0, 0, SIZE, SIZE)
        urls[frame] = canvas.toDataURL("image/png")
      }
      const url = urls[frame]
      links.forEach((l) => l.setAttribute("href", url))
      frame += 1
      timer = window.setTimeout(step, FRAME_MS)
    }
    const play = () => {
      if (stopped || playing || document.hidden) return
      window.clearTimeout(timer)
      frame = 0
      playing = true
      step()
    }
    const onVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(timer)
        playing = false
        showStatic()
      } else {
        play()
      }
    }

    sprite.onload = () => {
      if (stopped) return
      document.addEventListener("visibilitychange", onVisibility)
      play()
    }
    sprite.src = SPRITE

    return () => {
      stopped = true
      window.clearTimeout(timer)
      document.removeEventListener("visibilitychange", onVisibility)
      showStatic()
    }
  }, [])

  return null
}
