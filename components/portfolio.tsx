"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { experience, profile, stats, toolkit, videos, type Category, type Video } from "@/lib/data"

const FILTERS: ("All" | Category)[] = ["All", "Commercial", "Stories", "Cinematic"]
const thumb = (id: string) => `/thumbs/${id}.jpg`
const pad = (n: number) => String(n).padStart(2, "0")

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const [active, setActive] = useState<Video | null>(null)
  const [openExp, setOpenExp] = useState(0)
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const tcRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const shown = useMemo(() => (filter === "All" ? videos : videos.filter((v) => v.category === filter)), [filter])
  const strip = useMemo(() => videos.filter((v) => v.orientation === "portrait"), [])

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
    return () => cancelAnimationFrame(raf)
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

  const tilt = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`)
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`)
  }
  const untilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg")
    e.currentTarget.style.setProperty("--ry", "0deg")
  }

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
        <a href="#top" className="logo">
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
          <div className="hero-meta">
            <span className="rec">
              <i /> REC
            </span>
            <span ref={tcRef} className="tc">
              00:00:00:00
            </span>
            <span className="hide-sm">1080 × 1920 · 30 FPS</span>
            <span className="avail">
              <i /> Available for projects
            </span>
          </div>

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
            <p>
              I&apos;m <strong>{profile.name}</strong> — a video editor and filmmaker from {profile.location}, with three
              years of turning raw footage into brand films, tech shorts and stories that hold attention.
            </p>
            <div className="cta">
              <a href="#work" className="btn">
                Watch the work <span aria-hidden>↓</span>
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
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
            <span className="eyebrow">01 — Selected work</span>
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

          <div className="grid-wrap">
            <div className="grid">
              {shown.map((v, i) => (
                <button
                  key={v.id}
                  className={`card ${v.orientation} reveal`}
                  style={{ transitionDelay: `${(i % 4) * 60}ms` }}
                  data-play
                  onClick={() => setActive(v)}
                  onMouseMove={tilt}
                  onMouseLeave={untilt}
                >
                  <img src={thumb(v.id)} alt={v.title} loading="lazy" />
                  <span className="card-top">
                    <span>{v.category}</span>
                    <span>{v.duration}</span>
                  </span>
                  <span className="card-info">
                    <strong>{v.title}</strong>
                    <small>
                      {v.client} · {v.year}
                    </small>
                  </span>
                </button>
              ))}
            </div>
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
        <section id="experience" className="section split">
          <div className="section-head reveal">
            <span className="eyebrow">02 — Experience</span>
            <h2>
              The <em>timeline</em> so far.
            </h2>
            <p className="lede">From a tech-channel internship to co-founding a studio — shooting and cutting along the way. Tap a clip to open it.</p>
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View CV ↗
            </a>
          </div>

          <ol className="exp">
            {experience.map((e, i) => (
              <li key={e.role + e.org} className={`reveal ${openExp === i ? "open" : ""}`}>
                <button onClick={() => setOpenExp(openExp === i ? -1 : i)} aria-expanded={openExp === i}>
                  <span className="period">{e.period}</span>
                  <span className="what">
                    <strong>{e.role}</strong>
                    <small>{e.org}</small>
                  </span>
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
            <span className="eyebrow">03 — About</span>
            <h2>
              Editor by craft, <em>engineer</em> by training.
            </h2>
            <p>
              Hi, I&apos;m Arpan. I started by filming my own days on a Sony ZV-E10 and cutting them late at night — and
              never really stopped. Since then I&apos;ve shot and edited for studios, agencies and my own company, shaping pace, colour and sound until a piece
              feels inevitable.
            </p>
            <p>
              A computer-engineering background keeps my projects organised and my workflow fast. You bring the idea or
              the footage; I&apos;ll fuel it and bring it to life in the edit.
            </p>

            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <b>
                    <span data-count={s.value}>0</span>
                    {s.suffix}
                  </b>
                  <small>{s.label}</small>
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
          <span className="eyebrow reveal">04 — Contact</span>
          <h2 className="reveal">
            Got footage?
            <br />
            Let&apos;s make it <em>worth rewatching.</em>
          </h2>
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
              <iframe
                key={active.id}
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&playsinline=1`}
                title={active.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
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
              <a href={`https://www.youtube.com/watch?v=${active.id}`} target="_blank" rel="noopener noreferrer">
                Open on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
