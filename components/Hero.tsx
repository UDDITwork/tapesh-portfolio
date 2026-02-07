'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

const DroneScene = dynamic(() => import('./DroneScene'), {
  ssr: false,
  loading: () => <div className="three-canvas-wrapper" />,
})

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)
  const sceneWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split name into characters
      if (nameRef.current) {
        const text = 'TAPESH'
        nameRef.current.innerHTML = text
          .split('')
          .map((char) => `<span class="hero-char">${char}</span>`)
          .join('')

        const chars = nameRef.current.querySelectorAll('.hero-char')
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.8,
        })
      }

      // Tagline words stagger
      if (taglineRef.current) {
        const words = taglineRef.current.querySelectorAll('.tagline-word')
        gsap.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.3,
            ease: 'power2.out',
            delay: 1.8,
          }
        )
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 3.0, ease: 'power2.out' }
        )
      }

      // Line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { width: '0%' },
          { width: '100%', duration: 1.5, delay: 3.5, ease: 'power2.inOut' }
        )
      }

      // Chevron fade in
      if (chevronRef.current) {
        gsap.fromTo(
          chevronRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 3.8 }
        )
      }

      // Parallax: drone scene drifts up and fades on scroll
      if (sceneWrapperRef.current) {
        gsap.to(sceneWrapperRef.current, {
          y: -100,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* 3D Drone Scene */}
      <div ref={sceneWrapperRef} className="absolute inset-0 z-0">
        <DroneScene />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 text-center px-4">
        <h1
          ref={nameRef}
          className="text-text-light font-light"
          style={{
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            letterSpacing: '0.3em',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
        >
          TAPESH
        </h1>

        <div ref={taglineRef} className="mb-6">
          {['Drone Technologist.', 'Aerial Researcher.', 'Builder.'].map(
            (word, i) => (
              <span
                key={i}
                className="tagline-word inline-block mx-2 text-text-body font-light opacity-0"
                style={{
                  fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                  letterSpacing: '0.15em',
                }}
              >
                {word}
              </span>
            )
          )}
        </div>

        <p
          ref={subtitleRef}
          className="text-text-light font-light opacity-0"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
          }}
        >
          BIET Jhansi &nbsp;|&nbsp; Drone Learner&apos;s Club &nbsp;|&nbsp; Jhansi, UP
        </p>
      </div>

      {/* Divider line */}
      <div className="absolute bottom-20 left-0 right-0 px-12 z-10">
        <div
          ref={lineRef}
          className="mx-auto"
          style={{
            height: '1px',
            background: '#A8D8EA',
            width: '0%',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator opacity-0"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="#CCCCCC"
          strokeWidth="1"
        >
          <path d="M4 7 L10 13 L16 7" />
        </svg>
      </div>
    </section>
  )
}
