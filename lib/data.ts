// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export type Category = "Ad Videos" | "Social Media" | "Vlogish" | "Misc"
export type Orientation = "portrait" | "landscape" | "square"

export interface Video {
  id: string // YouTube video ID, or a slug for self-hosted videos
  src?: string // self-hosted file in /public/videos (omit for YouTube)
  title: string
  client: string
  category: Category
  orientation: Orientation
  year: string
  duration: string
  blurb: string
  role: string[]
}

export const profile = {
  name: "Arpan Wasti",
  handle: "arrpanz",
  title: "Video Editor & Filmmaker",
  location: "Lalitpur, Nepal",
  email: "wastiarpan7@gmail.com",
  instagram: "https://www.instagram.com/arrpanz/",
  youtube: "https://www.youtube.com/@ArpanWasti",
  cv: "https://drive.google.com/file/d/1-wbleXpKZSvU_RLbMAWdwsuGiFHDY1cl/view?usp=drive_link",
}

export const videos: Video[] = [
  {
    id: "bao-XpfqI70",
    title: "Moksh Heritage",
    client: "Moksh Heritage",
    category: "Ad Videos",
    orientation: "portrait",
    year: "2025",
    duration: "0:23",
    blurb: "A short brand film built on texture and atmosphere: slow reveals, warm grade, cut to breathe.",
    role: ["Edit", "Colour", "Sound design"],
  },
  {
    id: "rr-blanc-raza",
    src: "/videos/rr-blanc-raza.mp4",
    title: "Blanc Events: Raza",
    client: "Blanc Events · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:33",
    blurb: "A personality-led reel for an events venue, cut for pace and a strong first three seconds.",
    role: ["Edit"],
  },
  {
    id: "rr-damasqino-shawarma",
    src: "/videos/rr-damasqino-shawarma.mp4",
    title: "Shawarma Challenge",
    client: "Damasqino · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:26",
    blurb: "A food challenge reel built on quick cuts and close-up prep shots.",
    role: ["Edit"],
  },
  {
    id: "rr-lamb-boti",
    src: "/videos/rr-lamb-boti.mp4",
    title: "Lamb Boti",
    client: "Restaurant client · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:39",
    blurb: "Dialogue-led kitchen reel with captions timed to the delivery.",
    role: ["Edit"],
  },
  {
    id: "rr-hariyali",
    src: "/videos/rr-hariyali.mp4",
    title: "Hariyali Tikka",
    client: "Himalayan Dine In · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:11",
    blurb: "An eleven-second dish reel: tandoor to plate.",
    role: ["Edit"],
  },
  {
    id: "rr-rajas-pizza",
    src: "/videos/rr-rajas-pizza.mp4",
    title: "Three Pizza Deal",
    client: "Rajas · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2025",
    duration: "0:15",
    blurb: "A price-led offer reel with bold on-screen text.",
    role: ["Edit"],
  },
  {
    id: "rr-failte-pancakes",
    src: "/videos/rr-failte-pancakes.mp4",
    title: "Pancakes",
    client: "Failte · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:19",
    blurb: "A menu-item reel shot front of house and in the kitchen.",
    role: ["Edit"],
  },
  {
    id: "rr-favspot-chicken",
    src: "/videos/rr-favspot-chicken.mp4",
    title: "Chicken & Bacon",
    client: "Fav Spot · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:13",
    blurb: "A fast build-the-dish reel made for short attention spans.",
    role: ["Edit"],
  },
  {
    id: "TZ-vmdelkcY",
    title: "Nine to Five",
    client: "Personal film",
    category: "Misc",
    orientation: "portrait",
    year: "2024",
    duration: "0:37",
    blurb: "A voiceover-led piece about the weight of routine. Written, shot and cut as one idea.",
    role: ["Direction", "Camera", "Edit", "Colour"],
  },
  {
    id: "2vrnZd0FzC4",
    title: "Evening Escapes",
    client: "Personal film · Sony ZV-1",
    category: "Vlogish",
    orientation: "landscape",
    year: "2023",
    duration: "0:41",
    blurb: "Golden-hour b-roll study. Shot on a pocket camera, graded for mood, cut to the music.",
    role: ["Camera", "Edit", "Colour"],
  },
  {
    id: "-TVa6UjYEdw",
    title: "X-Age Infinity Smartwatch",
    client: "Gadgets In Nepal",
    category: "Ad Videos",
    orientation: "portrait",
    year: "2023",
    duration: "Short",
    blurb: "Short-form product spot shot for one of Nepal's leading tech channels. Hook first, specs fast.",
    role: ["Cinematography"],
  },
  {
    id: "qJgj8YXsLKk",
    title: "And this was my year 2022",
    client: "Personal film",
    category: "Vlogish",
    orientation: "landscape",
    year: "2023",
    duration: "3:58",
    blurb: "A year of footage condensed into four minutes: a recap edit driven by rhythm and memory.",
    role: ["Camera", "Edit", "Colour"],
  },
  {
    id: "TtnmnCybrKs",
    title: "Daily Life with Realme 11x 5G",
    client: "Gadgets In Nepal",
    category: "Ad Videos",
    orientation: "portrait",
    year: "2023",
    duration: "Short",
    blurb: "A day-in-the-life product film: lifestyle footage shaped into a clean, fast feature walkthrough.",
    role: ["Cinematography"],
  },
  {
    id: "aWMa7umDH4o",
    title: "POV: it's 3 AM",
    client: "Personal film",
    category: "Misc",
    orientation: "square",
    year: "2023",
    duration: "0:22",
    blurb: "Twenty-two seconds of insomnia. Mood carried by sound design and a restless cut.",
    role: ["Direction", "Edit", "Sound design"],
  },
  {
    id: "Dw8BRAAaQSY",
    title: "RE Hunter 350",
    client: "Personal film",
    category: "Misc",
    orientation: "portrait",
    year: "2023",
    duration: "0:15",
    blurb: "A fifteen-second motorcycle spot: speed ramps, hard cuts and engine-led sound.",
    role: ["Camera", "Edit", "Sound design"],
  },
  {
    id: "1jrs0ad8BVE",
    title: "Setting up my new space",
    client: "Personal film",
    category: "Vlogish",
    orientation: "landscape",
    year: "2023",
    duration: "0:37",
    blurb: "A desk-setup montage. Detail shots, match cuts and a tidy rhythm.",
    role: ["Camera", "Edit", "Colour"],
  },
  {
    id: "o7immgdRNTg",
    title: "Janakpur",
    client: "Travel film",
    category: "Vlogish",
    orientation: "portrait",
    year: "2024",
    duration: "0:20",
    blurb: "A travel postcard from Janakpur: colour, crowd and architecture in twenty seconds.",
    role: ["Camera", "Edit", "Colour"],
  },
  {
    id: "BZ7TyTdsjik",
    title: "The Art of Making Coffee",
    client: "Personal film",
    category: "Vlogish",
    orientation: "landscape",
    year: "2023",
    duration: "0:32",
    blurb: "Process film, shot handheld at home. Macro details and a patient cut.",
    role: ["Camera", "Edit"],
  },
  {
    id: "OHy7NG0opCc",
    title: "The Art of Making Tea",
    client: "Personal film",
    category: "Vlogish",
    orientation: "landscape",
    year: "2023",
    duration: "0:43",
    blurb: "The companion piece: steam, pour, stillness.",
    role: ["Camera", "Edit"],
  },
]

export interface Experience {
  period: string
  role: string
  org: string
  summary: string
  points: string[]
  videoId?: string // opens this piece from the "Watch" button
  link?: { label: string; href: string } // external piece (e.g. an Instagram post)
}

// Track V1 — jobs, newest first. Add dates to `period` (e.g. "2024 — 2025") when you have them.
export const employment: Experience[] = [
  {
    period: "Current",
    role: "Video Editor",
    org: "RestoRefine Studios",
    summary: "Editing client ads and short-form content from raw footage to final delivery.",
    points: [
      "Dialogue-led ads and reels: take selection, pacing, colour, sound and captions",
      "Vertical-first delivery for social platforms",
    ],
    link: { label: "Watch a client video on Instagram", href: "https://www.instagram.com/p/DFZoS-1JpHh/" },
  },
  {
    period: "Previously",
    role: "Cinematographer",
    org: "Asteroids Studio",
    summary: "Behind the camera on studio productions: framing, lighting and movement.",
    points: ["Shot with the edit in mind, so footage cuts together cleanly"],
  },
  {
    period: "Previously",
    role: "Content Head & Co-Founder",
    org: "Creatix & Co Pvt. Ltd.",
    summary: "Co-founded a creative company and led its content, from concept through shoot to final cut.",
    points: [
      "Set the creative direction and look of the brand's content",
      "Handled production end to end: planning, shooting and editing",
    ],
  },
  {
    period: "Previously",
    role: "Cinematographer & Video Editor",
    org: "Advibe 360 · Danphlink Technology",
    summary: "Shot and edited brand and promotional content across both companies.",
    points: ["Owned projects from camera to export", "Worked across ads, promos and social content"],
  },
  {
    period: "Where it started",
    role: "Cinematography Intern",
    org: "Gadgets In Nepal",
    summary: "Filmed product content for one of Nepal's most-watched tech channels.",
    points: ["Shot smartphone and wearable shorts", "Learned fast-turnaround, hook-first short-form production"],
    videoId: "-TVa6UjYEdw",
  },
]

// Track V2 — one-off projects and set credits.
export interface Project {
  title: string
  by: string
  byLabel: string
  role: string
  type: string
  videoId?: string
}

export const projects: Project[] = [
  { title: "Jay Nepal", by: "Cobweb", byLabel: "Artist", role: "Production Assistant", type: "Music video" },
  { title: "Laijau Hai Timarai Ghara", by: "Yabesh Thapa & Bizen", byLabel: "Artist", role: "Behind the scenes", type: "Music video" },
]

export const toolkit = [
  { name: "DaVinci Resolve", note: "Edit · Colour" },
  { name: "Adobe Premiere Pro", note: "Edit" },
  { name: "After Effects", note: "Motion" },
  { name: "Sony ZV-E10", note: "Camera" },
  { name: "Sound Design", note: "Mix · SFX" },
  { name: "Colour Grading", note: "Look dev" },
]

export const stats = [
  { value: 4, suffix: "+", label: "Years creating", desc: "From personal films to client ads, studio shoots and a company of my own." },
  { value: videos.length, suffix: "", label: "Featured pieces", desc: "A selection across commercial, story-led and cinematic work." },
  { value: 30, suffix: "fps", label: "Frame-accurate", desc: "Every cut is placed on purpose, down to the frame." },
]
