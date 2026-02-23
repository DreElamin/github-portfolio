import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Ribbon Background ────────────────────────────────────────────────────────
function RibbonBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ribbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="ribbon2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ribbon3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4C1D95" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ribbon4" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ribbon 1 — purple/teal, upper area */}
        <path
          stroke="url(#ribbon1)"
          strokeWidth="120"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M-100,300 Q300,100 600,300 T1000,200 T1540,350;
              M-100,400 Q200,150 500,380 T900,250 T1540,420;
              M-100,250 Q350,50 650,280 T1050,180 T1540,300;
              M-100,300 Q300,100 600,300 T1000,200 T1540,350
            "
          />
        </path>

        {/* Ribbon 2 — pink/cyan, lower area */}
        <path
          stroke="url(#ribbon2)"
          strokeWidth="80"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M-100,620 Q400,420 700,570 T1200,470 T1640,620;
              M-100,700 Q300,500 650,640 T1100,540 T1640,700;
              M-100,560 Q450,360 750,520 T1250,420 T1640,560;
              M-100,620 Q400,420 700,570 T1200,470 T1640,620
            "
          />
        </path>

        {/* Ribbon 3 — purple/teal thin, top */}
        <path
          stroke="url(#ribbon3)"
          strokeWidth="50"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        >
          <animate
            attributeName="d"
            dur="18s"
            repeatCount="indefinite"
            values="
              M-100,150 Q500,50 800,200 T1400,100 T1740,200;
              M-100,200 Q450,80 750,230 T1350,130 T1740,240;
              M-100,110 Q550,20 850,170 T1450,70 T1740,160;
              M-100,150 Q500,50 800,200 T1400,100 T1740,200
            "
          />
        </path>

        {/* Ribbon 4 — pink, flowing from right */}
        <path
          stroke="url(#ribbon4)"
          strokeWidth="100"
          fill="none"
          strokeLinecap="round"
          opacity="0.22"
        >
          <animate
            attributeName="d"
            dur="22s"
            repeatCount="indefinite"
            values="
              M1640,200 Q1200,420 800,320 T300,520 T-140,360;
              M1640,280 Q1100,480 750,380 T250,580 T-140,440;
              M1640,160 Q1250,380 850,280 T350,480 T-140,320;
              M1640,200 Q1200,420 800,320 T300,520 T-140,360
            "
          />
        </path>
      </svg>

      {/* Vignette to deepen edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.85) 100%)',
        }}
      />
    </div>
  )
}

// ─── Spotlight Card ───────────────────────────────────────────────────────────
function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.15)',
}) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${
        isHovered
          ? 'border-purple-600/60 shadow-[0_0_40px_rgba(139,92,246,0.25)]'
          : 'border-purple-900/30'
      } ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 40%), #0a0a0f`
          : '#0a0a0f',
      }}
    >
      {children}
    </div>
  )
}

// ─── Favorites Card ───────────────────────────────────────────────────────────
function FavoritesCard({ icon, label, value, sublabel }) {
  return (
    <div className="p-5 rounded-2xl bg-purple-950/10 border border-purple-900/20 hover:border-purple-700/40 transition-all duration-200 hover:bg-purple-950/25 group">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-gray-600 text-xs uppercase tracking-widest mb-1.5">
        {label}
      </p>
      <p className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">
        {value}
      </p>
      {sublabel && (
        <p className="text-gray-500 text-xs mt-0.5">{sublabel}</p>
      )}
    </div>
  )
}

// ─── Cursor Glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-10 rounded-full"
      style={{
        width: '350px',
        height: '350px',
        background:
          'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.12s ease, top 0.12s ease',
      }}
    />
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  'Home',
  'About',
  'Projects',
  'Experience',
  'Blog',
  'Contact',
]

function Navigation({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/60 border-b border-purple-900/20' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('Home')}
          className="text-xl font-bold shimmer-text focus:outline-none"
        >
          EE
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${
                currentPage === item
                  ? 'text-purple-300 bg-purple-900/30 border border-purple-700/50'
                  : 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/15'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 p-4 bg-black/90 backdrop-blur-md rounded-2xl border border-purple-900/30">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => {
                onNavigate(item)
                setMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none ${
                currentPage === item
                  ? 'text-purple-400 bg-purple-900/20'
                  : 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/10'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
const ROLES = [
  'Data Scientist',
  'Full-Stack Developer',
  'Theater Artist',
  'Problem Solver',
  'Emory Bear',
]

function HomePage({ onNavigate }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length)
        setRoleVisible(true)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page-enter min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-20 pt-20 md:pt-0">
      {/* Greeting */}
      <p className="blur-in text-purple-400 font-medium text-lg mb-4 tracking-widest uppercase">
        Hey there, I&apos;m
      </p>

      {/* Name */}
      <h1
        className="blur-in text-6xl md:text-8xl font-black mb-6"
        style={{ animationDelay: '0.1s' }}
      >
        <span className="shimmer-text">Elamin</span>
        <br />
        <span className="text-white">Elsayed</span>
      </h1>

      {/* Role */}
      <div className="h-10 mb-8 flex items-center justify-center">
        {roleVisible && (
          <span className="role-text text-2xl md:text-3xl font-semibold text-purple-300">
            {ROLES[roleIndex]}
          </span>
        )}
      </div>

      {/* Tagline */}
      <p
        className="blur-in text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
        style={{ animationDelay: '0.3s' }}
      >
        Data Science &amp; CS student at Emory University. I build things with
        data, code, and a touch of creativity.
      </p>

      {/* CTA Buttons */}
      <div
        className="blur-in flex flex-col sm:flex-row gap-4 mb-20"
        style={{ animationDelay: '0.5s' }}
      >
        <button
          onClick={() => onNavigate('Projects')}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-all duration-300 glow-purple transform hover:scale-105"
        >
          View My Work
        </button>
        <button
          onClick={() => onNavigate('Contact')}
          className="px-8 py-4 border border-purple-600 text-purple-400 hover:bg-purple-900/30 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Get In Touch
        </button>
      </div>

      {/* Favorites row */}
      <div
        className="blur-in w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3"
        style={{ animationDelay: '0.7s' }}
      >
        <FavoritesCard
          icon="🎵"
          label="On Repeat"
          value="Let Me Love You"
          sublabel="Mario"
        />
        <FavoritesCard
          icon="📺"
          label="Watching"
          value="Jujutsu Kaisen"
          sublabel="Currently airing"
        />
        <FavoritesCard
          icon="🎬"
          label="Fav Anime"
          value="Naruto"
          sublabel="Classic"
        />
        <FavoritesCard
          icon="📍"
          label="Based In"
          value="Atlanta, GA"
          sublabel="Originally Sudan"
        />
      </div>

    </div>
  )
}

// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage() {
  const facts = [
    { icon: '🎓', label: 'Emory University, Class of 2027' },
    { icon: '📊', label: 'Data Science & CS, minoring in Economics & Theater' },
    { icon: '🌍', label: 'Originally from Sudan, based in Atlanta, GA' },
    { icon: '⚽', label: 'Soccer player & gym enthusiast' },
    { icon: '🎭', label: 'Actor and director with multi-area theater experience' },
    { icon: '📚', label: 'Non-fiction reader & documentary lover' },
    { icon: '🍜', label: 'Anime fan (always down for recommendations)' },
    { icon: '✈️', label: 'Travel & exploration addict' },
  ]

  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-6 relative z-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            About <span className="shimmer-text">Me</span>
          </h2>
          <p className="text-gray-500 text-lg">
            A little bit of everything, a whole lot of curiosity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Photo + Quick Info */}
          <div className="space-y-6">
            {/* Photo placeholder */}
            <SpotlightCard
              className="aspect-[4/5] flex items-center justify-center"
              spotlightColor="rgba(139, 92, 246, 0.12)"
            >
              <div className="text-center p-6">
                <div className="text-8xl mb-4">👨🏾‍💻</div>
                <p className="text-purple-300/50 text-sm">
                  Add elamin-photo.jpg to /public
                </p>
              </div>
            </SpotlightCard>

            {/* Social links */}
            <div className="flex gap-3 justify-center">
              {[
                {
                  label: 'GitHub',
                  href: 'https://github.com/DreElamin',
                  icon: '⌨️',
                },
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com/in/elamin-elsayed',
                  icon: '💼',
                },
                {
                  label: 'Email',
                  href: 'mailto:elamin.e.elsayed@gmail.com',
                  icon: '✉️',
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-800/50 text-purple-400 hover:bg-purple-900/30 hover:border-purple-600 transition-all duration-200 text-sm"
                >
                  <span>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Bio text */}
          <div className="space-y-8">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                I&apos;m Elamin, a Data Science and Computer Science student at
                Emory University with a genuine love for building things that
                matter and telling stories worth telling.
              </p>
              <p>
                Growing up in Sudan, where access to technology wasn&apos;t
                always guaranteed, shaped the way I see the internet and data.
                I&apos;m especially interested in building tools that make
                technology more accessible, meaningful, and empowering.
              </p>
              <p>
                I also grew up in the UAE, which gave me an international lens
                and the ability to see the world through different cultural
                perspectives.
              </p>
            </div>

            {/* Theater section */}
            <SpotlightCard
              className="p-6"
              spotlightColor="rgba(139, 92, 246, 0.1)"
            >
              <h3 className="text-purple-400 font-bold text-lg mb-3 flex items-center gap-2">
                🎭 Theater &amp; Storytelling
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Theater has shaped how I think about communication, empathy, and
                collaboration. From acting to directing, it&apos;s taught me
                that the best technology, like the best performance, is
                invisible: it just works, and it moves people.
              </p>
            </SpotlightCard>

            {/* Extracurricular Involvements */}
            <SpotlightCard
              className="p-6"
              spotlightColor="rgba(139, 92, 246, 0.1)"
            >
              <h3 className="text-purple-400 font-bold text-lg mb-4 flex items-center gap-2">
                🎯 Extracurricular Involvements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-0.5 shrink-0">▸</span>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Emory for Sudan, Co-Founder
                    </p>
                    <p className="text-gray-400 text-xs leading-relaxed mt-0.5">
                      Raising awareness and support for those affected by the
                      ongoing crisis in Sudan. My heritage is part of why I
                      build.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-0.5 shrink-0">▸</span>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Muslim Student Association, Treasurer
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-0.5 shrink-0">▸</span>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Residential Advisor
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-500 mt-0.5 shrink-0">▸</span>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Theater Emory
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Fun facts */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Quick Facts
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {facts.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-gray-400 text-sm hover:text-gray-300 transition-colors"
                  >
                    <span className="text-base">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Projects Page ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Strides',
    status: 'In Progress',
    description:
      'A gamified city exploration app that turns your surroundings into an adventure. Fog-of-war map exploration, location-based pins with rarity evolution, badges, and leaderboards.',
    tech: ['React', 'TypeScript', 'Mapbox', 'Node.js'],
    color: 'from-purple-600 to-purple-900',
    icon: '🗺️',
    link: null,
    github: 'https://github.com/DreElamin',
  },
  {
    title: 'BiteLog',
    status: 'Complete',
    description:
      'A social nutrition tracker with AI-powered food recognition via Google Gemini. Snap a photo, get nutritional data instantly, and share meals with friends.',
    tech: ['Python', 'Flask', 'MySQL', 'Google Gemini AI'],
    color: 'from-purple-700 to-indigo-900',
    icon: '🍽️',
    link: null,
    github: 'https://github.com/DreElamin',
  },
  {
    title: 'Food Bank Demand Predictor',
    status: 'Complete',
    description:
      'An LSTM neural network that forecasts food bank demand based on historical usage, seasonal trends, and economic indicators — helping nonprofits allocate resources.',
    tech: ['Python', 'Pandas', 'NumPy', 'LSTM'],
    color: 'from-violet-700 to-purple-900',
    icon: '📊',
    link: null,
    github: 'https://github.com/DreElamin',
  },
  {
    title: 'Health Condition Classifier',
    status: 'Complete',
    description:
      'A machine learning web application that classifies health conditions from user-provided symptoms, built with SMOTE for class balancing and an intuitive Streamlit interface.',
    tech: ['Python', 'Scikit-learn', 'Streamlit', 'SMOTE'],
    color: 'from-purple-800 to-violet-900',
    icon: '🏥',
    link: null,
    github: 'https://github.com/DreElamin',
  },
]

function ProjectsPage() {
  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-6 relative z-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            My <span className="shimmer-text">Projects</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Things I&apos;ve built, am building, and dream about building
          </p>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <SpotlightCard
              key={project.title}
              spotlightColor="rgba(139, 92, 246, 0.12)"
              className="group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Top gradient bar */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${project.color}`}
              />

              <div className="p-6">
                {/* Icon + Status */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{project.icon}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'In Progress'
                        ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50'
                        : 'bg-green-900/30 text-green-400 border border-green-800/50'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-lg border border-purple-800/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    ⌨️ GitHub
                  </a>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      🔗 Live Demo
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Experience Page ──────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    role: 'Teaching Assistant — Quantitative Sciences',
    org: 'Emory University',
    period: 'Aug 2025 – Present',
    type: 'Academic',
    bullets: [
      'Support students in QSS coursework covering statistical methods and data analysis',
      'Lead review sessions and provide one-on-one tutoring for complex concepts',
      'Help students develop programming skills in R and Python',
    ],
    current: true,
  },
  {
    role: 'Tech Developer Intern',
    org: 'SEO (Sponsors for Educational Opportunity)',
    period: 'Jun 2025 – Aug 2025',
    type: 'Industry',
    bullets: [
      'Built and optimized full-stack features for internal tooling',
      'Collaborated with cross-functional teams in an agile environment',
      'Delivered production-ready code reviewed by senior engineers',
    ],
    current: false,
  },
  {
    role: 'Data Analyst',
    org: 'TechBridge AI.Data Lab',
    period: 'Aug 2024 – Dec 2024',
    type: 'Research',
    bullets: [
      'Analyzed datasets to surface actionable insights for nonprofit partners',
      'Built data pipelines and visualizations using Python and Tableau',
      'Contributed to the Food Bank Demand Predictor ML project',
    ],
    current: false,
  },
]

function ExperiencePage() {
  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-6 relative z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="shimmer-text">Experience</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Where I&apos;ve worked, learned, and grown
          </p>
        </div>

        {/* Resume button */}
        <div className="text-center mb-12">
          <a
            href="/ElaminElsayed_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-all duration-300 glow-purple"
          >
            📄 Download Resume
          </a>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-purple-900/50 to-transparent" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="relative pl-16">
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 top-1.5 w-4 h-4 rounded-full border-2 ${
                    exp.current
                      ? 'border-purple-500 bg-purple-600 pulse-dot'
                      : 'border-purple-800 bg-purple-950'
                  }`}
                />

                {/* Card */}
                <SpotlightCard
                  className="p-6"
                  spotlightColor="rgba(139, 92, 246, 0.1)"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-3 mb-2">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-purple-400 font-medium">{exp.org}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-gray-500 text-sm">{exp.period}</span>
                      <span className="px-2 py-0.5 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-800/30">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-gray-400 text-sm"
                      >
                        <span className="text-purple-500 mt-0.5 shrink-0">
                          ▸
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>

        {/* Education card */}
        <div className="mt-16">
          <SpotlightCard
            className="p-6"
            spotlightColor="rgba(139, 92, 246, 0.12)"
          >
            <h3 className="text-purple-400 font-bold text-xl mb-4 flex items-center gap-2">
              🎓 Education
            </h3>
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-lg">
                  Emory University
                </p>
                <p className="text-gray-400">
                  B.S. Data Science &amp; Computer Science
                </p>
                <p className="text-gray-500 text-sm">
                  Minors: Economics &amp; Theater
                </p>
                <p className="text-purple-400/70 text-sm mt-1">
                  GPA: 3.78 · Dean&apos;s List
                </p>
              </div>
              <div className="text-right">
                <p className="text-purple-400 font-semibold">Class of 2027</p>
                <p className="text-gray-500 text-sm">Atlanta, GA</p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  )
}

// ─── Blog Page ────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    title: 'Building Strides: Lessons from a First-Time Founder',
    date: 'Coming Soon',
    category: 'Product',
    excerpt:
      'What I learned trying to build a gamified exploration app — technical decisions, team dynamics, and why user research is everything.',
    ready: false,
  },
  {
    title: 'How Theater Made Me a Better Engineer',
    date: 'Coming Soon',
    category: 'Personal',
    excerpt:
      'The surprising overlap between stage performance and software engineering, and why I think every developer should take an improv class.',
    ready: false,
  },
  {
    title: 'Predicting Food Bank Demand with LSTMs',
    date: 'Coming Soon',
    category: 'Technical',
    excerpt:
      "A deep dive into the architecture, data challenges, and surprising lessons from building an LSTM model for humanitarian supply chain forecasting.",
    ready: false,
  },
]

function BlogPage() {
  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-6 relative z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            The <span className="shimmer-text">Blog</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Thoughts on tech, creativity, and everything in between
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {BLOG_POSTS.map((post, i) => (
            <SpotlightCard
              key={i}
              className="group p-6 cursor-pointer"
              spotlightColor="rgba(139, 92, 246, 0.1)"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-800/30">
                  {post.category}
                </span>
                <span className="text-gray-600 text-sm">{post.date}</span>
                {!post.ready && (
                  <span className="px-3 py-1 bg-yellow-900/20 text-yellow-500 text-xs rounded-full border border-yellow-800/30">
                    Coming Soon
                  </span>
                )}
              </div>

              <h3 className="text-white font-bold text-xl mb-3 group-hover:text-purple-300 transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </SpotlightCard>
          ))}
        </div>

        <p className="mt-12 text-center text-gray-600 text-sm">
          More posts dropping soon. Check back!
        </p>
      </div>
    </div>
  )
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Integrate with Formspree, EmailJS, or similar
    setSubmitted(true)
  }

  return (
    <div className="page-enter min-h-screen pt-24 pb-16 px-6 relative z-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Let&apos;s <span className="shimmer-text">Connect</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Always open to interesting conversations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — links */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-xl">Find Me Here</h3>

            {[
              {
                icon: '✉️',
                label: 'Email',
                value: 'elamin.e.elsayed@gmail.com',
                href: 'mailto:elamin.e.elsayed@gmail.com',
              },
              {
                icon: '💼',
                label: 'LinkedIn',
                value: 'linkedin.com/in/elamin-elsayed',
                href: 'https://linkedin.com/in/elamin-elsayed',
              },
              {
                icon: '⌨️',
                label: 'GitHub',
                value: 'github.com/DreElamin',
                href: 'https://github.com/DreElamin',
              },
              {
                icon: '📍',
                label: 'Location',
                value: 'Atlanta, GA',
                href: null,
              },
            ].map(({ icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-2xl bg-purple-950/10 border border-purple-900/30 hover:border-purple-700/50 transition-all duration-200"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-900/30 text-xl shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-300 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Resume */}
            <a
              href="/ElaminElsayed_Resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-purple-700 text-purple-400 hover:bg-purple-900/30 font-semibold rounded-full transition-all duration-200"
            >
              📄 Download Resume
            </a>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-purple-950/20 border border-purple-800/30">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-white font-bold text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400 text-sm">
                  Thanks for reaching out. I&apos;ll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    className="w-full px-4 py-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-all duration-300 glow-purple"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onNavigate }) {
  return (
    <footer className="relative z-20 border-t border-purple-900/20 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('Home')}
          className="text-lg font-bold shimmer-text focus:outline-none"
        >
          EE
        </button>
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Elamin Elsayed. Built with React +
          Tailwind.
        </p>
        <div className="flex gap-4">
          {[
            { label: 'GitHub', href: 'https://github.com/DreElamin' },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/elamin-elsayed',
            },
            {
              label: 'Email',
              href: 'mailto:elamin.e.elsayed@gmail.com',
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState('Home')

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage onNavigate={navigate} />
      case 'About':
        return <AboutPage />
      case 'Projects':
        return <ProjectsPage />
      case 'Experience':
        return <ExperiencePage />
      case 'Blog':
        return <BlogPage />
      case 'Contact':
        return <ContactPage />
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <RibbonBackground />
      <CursorGlow />
      <Navigation currentPage={currentPage} onNavigate={navigate} />

      <main key={currentPage}>{renderPage()}</main>

      {currentPage !== 'Home' && <Footer onNavigate={navigate} />}
    </div>
  )
}
