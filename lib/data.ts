// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export type Category = "Social Media" | "Ad Videos" | "Nepali Content" | "Cinematic Videos"
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
  note?: string // small disclosure shown under the title
}

export const profile = {
  name: "Arpan Wasti",
  handle: "arrpanz",
  title: "Video Editor & Filmmaker",
  location: "Lalitpur, Nepal",
  email: "wastiarpan7@gmail.com",
  instagram: "https://www.instagram.com/arrpanz/",
  youtube: "https://www.youtube.com/@ArpanWasti",
  cv: "/Arpan-Wasti-CV.pdf",
}

export const videos: Video[] = [
  {
    id: "rr-daytoday-savethedate",
    src: "/videos/rr-daytoday-savethedate.mp4",
    title: "Save the Date",
    client: "Day-Today · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:17",
    blurb: "Presenter-led store opening teaser with whip transitions.",
    role: ["Edit", "Captions"],
    note: "AI generated first 5 seconds",
  },
  {
    id: "rr-lets-be-honest",
    src: "/videos/rr-lets-be-honest.mp4",
    title: "Let's Be Honest",
    client: "RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2025",
    duration: "0:31",
    blurb: "A direct-to-camera pitch with keyword captions and highlighted phrases.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-comment-refine",
    src: "/videos/rr-comment-refine.mp4",
    title: "Comment Refine",
    client: "RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2025",
    duration: "0:21",
    blurb: "A call-to-action reel with animated counters and bold text.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-zaks-stirfry",
    src: "/videos/rr-zaks-stirfry.mp4",
    title: "Regular or Stir Fry",
    client: "Zak's Spudbox · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:21",
    blurb: "Presenter-led reel cut over a graphic backdrop, with captions landing on the beat.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-westend-3things",
    src: "/videos/rr-westend-3things.mp4",
    title: "3 Things",
    client: "Westend · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:19",
    blurb: "A fast list-style reel with motion-blur transitions between locations.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-westend-opening",
    src: "/videos/rr-westend-opening.mp4",
    title: "Opening Day",
    client: "Westend · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:21",
    blurb: "A store-opening announcement with bold yellow captions on every beat.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-zaks-spudbox",
    src: "/videos/rr-zaks-spudbox.mp4",
    title: "Spudbox Is Coming",
    client: "Zak's Spudbox · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:12",
    blurb: "A launch teaser with punchy word-by-word captions and whip transitions.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-hdi-butter-chicken",
    src: "/videos/rr-hdi-butter-chicken.mp4",
    title: "Butter Chicken & Garlic Naan",
    client: "Himalayan Dine In · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:12",
    blurb: "A twelve-second dish reel with big, bold captions.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-failte-burger",
    src: "/videos/rr-failte-burger.mp4",
    title: "South Indian Burger",
    client: "Failte · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:14",
    blurb: "A layer-by-layer burger build with colour-wipe transitions.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-roundabout-pizza",
    src: "/videos/rr-roundabout-pizza.mp4",
    title: "Cheesy Doner Pizza",
    client: "Indian Roundabout · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:36",
    blurb: "A menu walkthrough with captions naming every dish.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-daytoday-eastkilbride",
    src: "/videos/rr-daytoday-eastkilbride.mp4",
    title: "Oi East Kilbride",
    client: "Day-Today · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:10",
    blurb: "A ten-second store announcement with word-by-word captions.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-daytoday-biglaunch",
    src: "/videos/rr-daytoday-biglaunch.mp4",
    title: "Until the Big Launch",
    client: "Day-Today · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:17",
    blurb: "A launch countdown reel with pop-in product graphics.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-launch-recap",
    src: "/videos/rr-launch-recap.mp4",
    title: "Launch Day Recap",
    client: "Day-Today · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:35",
    blurb: "A recap of launch day: crowd reactions, vox pops and results.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-damasqino-scottish-wrap",
    src: "/videos/rr-damasqino-scottish-wrap.mp4",
    title: "Scottish Shawarma Wrap",
    client: "Damasqino · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:23",
    blurb: "A dish reel from spit to wrap, cut tight to the voiceover.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-nisa-stop-scrolling",
    src: "/videos/rr-nisa-stop-scrolling.mp4",
    title: "Stop Scrolling",
    client: "Nisa Local · RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2025",
    duration: "0:26",
    blurb: "A store-opening reel with bright captions and quick location changes.",
    role: ["Edit", "Captions"],
  },
  {
    id: "rr-website-makeover",
    src: "/videos/rr-website-makeover.mp4",
    title: "Website Makeover",
    client: "RestoRefine Studios",
    category: "Social Media",
    orientation: "portrait",
    year: "2026",
    duration: "0:23",
    blurb: "A talking-head piece with screen recordings layered over the presenter.",
    role: ["Edit", "Captions"],
  },
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
    id: "np-december-intake",
    src: "/videos/np-december-intake.mp4",
    title: "December Intake",
    client: "Nepali content",
    category: "Nepali Content",
    orientation: "portrait",
    year: "2025",
    duration: "0:35",
    blurb: "A Nepali-language explainer with motion graphics and b-roll cutaways.",
    role: ["Edit", "Captions"],
  },
  {
    id: "TZ-vmdelkcY",
    title: "Nine to Five",
    client: "Personal film",
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
    category: "Cinematic Videos",
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
