'use client'

import { useEffect, useState } from 'react'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[9998] transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: `translateX(-50%) translateY(${visible ? 0 : -20}px)`,
      }}
    >
      <div
        className="flex items-center gap-8 px-8 py-3"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #E0E0E0',
          borderRadius: '2px',
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollTo(item.href)}
            className="text-text-body hover:text-text-heading transition-colors duration-300 font-light interactive"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'none',
              border: 'none',
              cursor: 'none',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
