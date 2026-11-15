"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { employment, profile, projects, stats, toolkit, videos, type Category, type Video } from "@/lib/data"

const FILTERS: ("All" | Category)[] = ["All", "Ad Videos", "Social Media", "Cinematic Videos"]
const thumb = (id: string) => `/thumbs/${id}.jpg`
const pad = (n: number) => String(n).padStart(2, "0")

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const [active, setActive] = useState<Video | null>(null)
  const [openExp, setOpenExp] = useState(0)
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [idx, setIdx] = useState(0) // centred slide in the reel
  const [hoverId, setHoverId] = useState<string | null>(null)

  const tcRef = useRef<HTMLSpanElement>(null)
  const clockRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })

  const shown = useMemo(() => (filter === "All" ? videos : videos.filter((v) => v.category === filter)), [filter])
  // hero film strip: client work only (own-channel films stay in their category)
  const strip = useMemo(() => videos.filter((v) => v.orientation === "portrait" && v.category !== "Cinematic Videos"), [])

  // Running timecode (30 fps) in the hero
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const f = Math.floor(((now - start) / 1000) * 30)
      const s = Math.floor(f / 30)
      if (tcRef.current)
        tcRef.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % 30)}`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const clock = () => {
      if (clockRef.current)
        clockRef.current.textContent = `${new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kathmandu" })} NPT`
    }
    clock()
    const iv = setInterval(clock, 1000)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(iv)
    }
  }, [])

  // Scroll progress "playhead"
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Reveal on scroll + count-up stats
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          el.classList.add("in")
          io.unobserve(el)
          el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
            const to = Number(n.dataset.count)
            const t0 = performance.now()
            const step = (t: number) => {
              const p = Math.min(1, (t - t0) / 1100)
              n.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))))
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [shown])

  // Custom cursor
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const c = cursorRef.current
    if (!c) return
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      c.classList.add("on")
      c.classList.toggle("play", !!(e.target as HTMLElement).closest?.("[data-play]"))
    }
    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener("mousemove", move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", move)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Lightbox navigation
  const stepVideo = useCallback(
    (dir: number) => {
      setActive((cur) => {
        if (!cur) return cur
        const list = shown.includes(cur) ? shown : videos
        return list[(list.indexOf(cur) + dir + list.length) % list.length]
      })
    },
    [shown],
  )

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
      if (e.key === "ArrowRight") stepVideo(1)
      if (e.key === "ArrowLeft") stepVideo(-1)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [active, stepVideo])

  // ── Reel (centred carousel) ──
  const goTo = useCallback((i: number, smooth = true) => {
    const t = trackRef.current
    if (!t) return
    const el = t.children[Math.max(0, Math.min(t.children.length - 1, i))] as HTMLElement | undefined
    if (!el) return
    t.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - t.clientWidth / 2, behavior: smooth ? "smooth" : "instant" })
  }, [])

  const onTrackScroll = () => {
    const t = trackRef.current
    if (!t) return
    const mid = t.scrollLeft + t.clientWidth / 2
    let best = 0
    let dist = Infinity
    Array.from(t.children).forEach((c, i) => {
      const el = c as HTMLElement
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    setIdx(best)
  }

  useEffect(() => {
    setIdx(0)
    setHoverId(null)
    goTo(0, false)
  }, [shown, goTo])

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return // touch uses native swipe
    drag.current = { down: true, x: e.clientX, left: e.currentTarget.scrollLeft, moved: false }
  }
  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.down) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 6 && !d.moved) {
      d.moved = true
      e.currentTarget.classList.add("dragging")
    }
    if (d.moved) e.currentTarget.scrollLeft = d.left - dx
  }
  const onDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return
    drag.current.down = false
    e.currentTarget.classList.remove("dragging")
  }

  const previewOn = (id: string) => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setHoverId(id), 220)
  }
  const previewOff = () => {
    clearTimeout(hoverTimer.current)
    setHoverId(null)
  }
  const pickSlide = (v: Video, i: number) => {
    if (drag.current.moved) return // it was a drag, not a click
    if (i === idx) setActive(v)
    else goTo(i)
  }
  const cur = shown[Math.min(idx, shown.length - 1)]

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const openById = (id?: string) => {
    const v = videos.find((x) => x.id === id)
    if (v) setActive(v)
  }

  const nav = [
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ]

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="progress" aria-hidden>
        <div ref={progressRef} />
      </div>
      <div ref={cursorRef} className="cursor" aria-hidden>
        <span>Play</span>
      </div>

      <header className="nav">
        <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="logo" aria-label="arrpanz on Instagram">
          arrpanz<i />
        </a>
        <nav className={menuOpen ? "open" : ""}>
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-sm">
          Let&apos;s talk
        </a>
        <button className="burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </header>

      <main id="top">
        {/* ───────── HERO ───────── */}
        <section className="hero">
          <div className="hero-bg" aria-hidden />
          <div className="hero-meta">
            <span className="avail">
              <i /> Available for projects
            </span>
          </div>

          <button className="showreel" data-play onClick={() => setActive(videos[0])}>
            <i aria-hidden /> Play featured cut
          </button>

          <h1>
            <span className="line">
              <span>I cut stories</span>
            </span>
            <span className="line">
              <span>
                people <em>rewatch.</em>
              </span>
            </span>
          </h1>

          <div className="hero-foot">
            <ul className="brackets">
              <li>{profile.location}</li>
              <li>{profile.title}</li>
              <li>
                <i aria-hidden /> <span ref={clockRef}>Kathmandu time</span>
              </li>
            </ul>
            <div>
              <p>
                I&apos;m <strong>{profile.name}</strong>. Every frame has a job and every cut has a reason. I turn raw
                footage into brand films, short-form and stories that hold attention.
              </p>
              <div className="cta">
                <a href="#work" className="btn">
                  View works <span aria-hidden>↓</span>
                </a>
                <a href="#contact" className="btn btn-ghost">
                  Get in touch
                </a>
              </div>
            </div>
          </div>

          <div className="film" aria-label="Featured reels">
            <div className="film-track">
              {[...strip, ...strip].map((v, i) => (
                <button key={i} className="frame" data-play onClick={() => setActive(v)} tabIndex={i < strip.length ? 0 : -1} aria-label={`Play ${v.title}`}>
                  <img src={thumb(v.id)} alt="" loading={i < 6 ? "eager" : "lazy"} />
                  <span>{v.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── MARQUEE ───────── */}
        <div className="marquee" aria-hidden>
          <div>
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k}>
                Brand films <b>✦</b> Short-form <b>✦</b> Colour grading <b>✦</b> Sound design <b>✦</b> Motion graphics <b>✦</b> Storytelling <b>✦</b>{" "}
              </span>
            ))}
          </div>
        </div>

        {/* ───────── WORK ───────── */}
        <section id="work" className="section">
          <div className="section-head reveal">
            <span className="eyebrow">Featured works</span>
            <h2>
              Frames that <em>earn</em> the next one.
            </h2>
            <div className="filters" role="tablist">
              {FILTERS.map((f) => (
                <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
                  {f}
                  <sup>{f === "All" ? videos.length : videos.filter((v) => v.category === f).length}</sup>
                </button>
              ))}
            </div>
          </div>

          <div className="reel reveal">
            <div
              className="reel-track"
              ref={trackRef}
              onScroll={onTrackScroll}
              onPointerDown={onDragStart}
              onPointerMove={onDragMove}
              onPointerUp={onDragEnd}
              onPointerLeave={onDragEnd}
              tabIndex={0}
              aria-label="Videos, use the arrow keys to browse"
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") (e.preventDefault(), goTo(idx + 1))
                if (e.key === "ArrowLeft") (e.preventDefault(), goTo(idx - 1))
                if (e.key === "Enter" && cur) setActive(cur)
              }}
            >
              {shown.map((v, i) => (
                <div
                  key={v.id}
                  role="button"
                  aria-label={`${v.title}, play with sound`}
                  className={`slide ${v.orientation} ${i === idx ? "is-active" : ""}`}
                  onClick={() => pickSlide(v, i)}
                  onMouseEnter={() => previewOn(v.id)}
                  onMouseLeave={previewOff}
                >
                  <img src={thumb(v.id)} alt="" draggable={false} loading={i < 4 ? "eager" : "lazy"} />
                  {hoverId === v.id && !active && v.src && <video src={v.src} muted autoPlay loop playsInline />}
                  {hoverId === v.id && !active && !v.src && (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&mute=1&loop=1&playlist=${v.id}&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1`}
                      title={`${v.title} preview`}
                      allow="autoplay; encrypted-media"
                      tabIndex={-1}
                    />
                  )}
                  <span className="slide-tag">{v.category}</span>
                  <span className="slide-dur">{v.duration}</span>
                </div>
              ))}
            </div>

            <div className="reel-bar">
              <button className="reel-btn" onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label="Previous video">
                ←
              </button>
              {cur && (
                <div className="reel-caption" aria-live="polite">
                  <span className="count">
                    {pad(idx + 1)} / {pad(shown.length)}
                  </span>
                  <strong>{cur.title}</strong>
                  <small>
                    {cur.client} · {cur.year}
                  </small>
                </div>
              )}
              <button className="reel-btn" onClick={() => goTo(idx + 1)} disabled={idx >= shown.length - 1} aria-label="Next video">
                →
              </button>
            </div>
            <p className="reel-hint">Hover to preview, click for sound, swipe or use the arrows</p>
          </div>
          <p className="more reveal">
            More on{" "}
            <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
              YouTube ↗
            </a>{" "}
            and{" "}
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
          </p>
        </section>

        {/* ───────── EXPERIENCE ───────── */}
        <section id="experience" className="section">
          <div className="section-head reveal">
            <span className="eyebrow">Experience</span>
            <h2>
              Jobs and projects, <em>side by side.</em>
            </h2>
            <p className="lede">Where I&apos;ve been employed, and the one-off productions I&apos;ve crewed on.</p>
          </div>

          <div className="tracks">
            <div className="track">
              <h3 className="track-title reveal">
                Where I&apos;ve <em>worked</em>
                <small>{employment.length} roles</small>
              </h3>
              <ol className="exp">
                {employment.map((e, i) => (
                  <li key={e.role + e.org} className={`reveal ${openExp === i ? "open" : ""}`}>
                    <button onClick={() => setOpenExp(openExp === i ? -1 : i)} aria-expanded={openExp === i}>
                      <span className="dot" aria-hidden />
                      <span className="what">
                        <strong>{e.role}</strong>
                        <small>{e.org}</small>
                      </span>
                      <span className="period">{e.period}</span>
                      <span className="plus" aria-hidden />
                    </button>
                    <div className="exp-body">
                      <div>
                        <p>{e.summary}</p>
                        <ul>
                          {e.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                        {e.videoId && (
                          <button className="watch" data-play onClick={() => openById(e.videoId)}>
                            <i aria-hidden>▶</i> Watch a piece from this
                          </button>
                        )}
                        {e.link && (
                          <a className="watch" href={e.link.href} target="_blank" rel="noopener noreferrer">
                            <i aria-hidden>▶</i> {e.link.label} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-ghost cv reveal">
                View CV ↗
              </a>
            </div>

            <div className="track">
              <h3 className="track-title reveal">
                What I&apos;ve <em>been part of</em>
                <small>{projects.length} projects</small>
              </h3>
              <ul className="projs">
                {projects.map((p) => (
                  <li key={p.title} className="proj reveal">
                    <span className="proj-type">{p.type}</span>
                    <h4>{p.title}</h4>
                    <p>{p.by}</p>
                    <span className="proj-role">{p.role}</span>
                    {p.videoId && (
                      <button className="watch" data-play onClick={() => openById(p.videoId)}>
                        <i aria-hidden>▶</i> Watch
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── ABOUT ───────── */}
        <section id="about" className="section about">
          <div className="avatar reveal">
            <img src="/profile.png" alt={`${profile.name} against a sunset skyline`} />
            <span className="tag">
              {profile.handle} · {profile.location}
            </span>
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow">Meet Arpan</span>
            <h2>
              Editor by craft, <em>filmmaker</em> at heart.
            </h2>
            <p>
              Hi, I&apos;m Arpan. I started by filming my own days on a Sony ZV-E10 and cutting them late at night, and
              never really stopped. Since then I&apos;ve shot and edited for studios, agencies and my own company, shaping pace, colour and sound until a piece
              feels inevitable.
            </p>
            <p>
              You bring the idea or the footage; I&apos;ll fuel it and bring it to life in the edit.
            </p>

            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <b>
                    <span data-count={s.value}>0</span>
                    <sup>{s.suffix}</sup>
                  </b>
                  <small>{s.label}</small>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>

            <ul className="toolkit">
              {toolkit.map((t) => (
                <li key={t.name}>
                  {t.name}
                  <small>{t.note}</small>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── CONTACT ───────── */}
        <section id="contact" className="section contact">
          <span className="eyebrow reveal">Contact</span>
          <h2 className="reveal">
            Got footage?
            <br />
            Let&apos;s make it <em>worth rewatching.</em>
          </h2>
          <div className="contact-row">
            <button className="email reveal" onClick={copyEmail}>
              {profile.email}
              <span>{copied ? "Copied ✓" : "Click to copy"}</span>
            </button>
            <div className="links reveal">
              <a href={`mailto:${profile.email}`}>Email ↗</a>
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </a>
              <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
                YouTube ↗
              </a>
              <a href={profile.cv} target="_blank" rel="noopener noreferrer">
                CV ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Cut in {profile.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>

      {/* ───────── LIGHTBOX ───────── */}
      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <button className="lb-close" aria-label="Close">
            Close ✕
          </button>
          <button className="lb-nav prev" aria-label="Previous" onClick={(e) => (e.stopPropagation(), stepVideo(-1))}>
            ←
          </button>
          <button className="lb-nav next" aria-label="Next" onClick={(e) => (e.stopPropagation(), stepVideo(1))}>
            →
          </button>
          <div className={`lb-inner ${active.orientation}`} onClick={(e) => e.stopPropagation()}>
            <div className="player">
              {active.src ? (
                <video key={active.id} src={active.src} poster={thumb(active.id)} controls autoPlay playsInline />
              ) : (
                <iframe
                  key={active.id}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&playsinline=1`}
                  title={active.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
            <div className="lb-info">
              <span className="eyebrow">
                {active.category} · {active.year}
              </span>
              <h3>{active.title}</h3>
              <small>{active.client}</small>
              <p>{active.blurb}</p>
              <ul>
                {active.role.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
{!active.src && (
                <a href={`https://www.youtube.com/watch?v=${active.id}`} target="_blank" rel="noopener noreferrer">
                  Open on YouTube ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
