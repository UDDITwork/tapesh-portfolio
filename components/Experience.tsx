'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionReveal from './SectionReveal'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Coordinator',
    org: 'The Drone Learner\'s Club, BIET Jhansi',
    date: 'Dec 2025 – Present',
  },
  {
    role: 'Core Member',
    org: 'Bureau of Indian Standards',
    date: 'Dec 2025 – Present',
  },
  {
    role: 'Member',
    org: 'Alumni Association, BIET Jhansi',
    date: 'Jan 2026 – Present',
  },
  {
    role: 'Summer Trainee',
    org: 'IFFCO, Aonla',
    date: 'Jun – Jul 2025',
  },
  {
    role: 'Member',
    org: 'SEWA',
    date: 'Sep 2025 – Present',
  },
  {
    role: 'Campus Ambassador',
    org: 'E-Summit\'25, IIT Roorkee',
    date: 'Jun 2025 – Present',
  },
  {
    role: 'Student Volunteer',
    org: 'Bundelkhand Innovation & Incubation Center',
    date: 'Oct 2024 – Oct 2025',
  },
  {
    role: 'Member',
    org: 'Seekspace',
    date: 'Sep 2024 – Oct 2025',
  },
  {
    role: 'Student Activities Coordinator',
    org: 'GBP Engineering College',
    date: 'Jul – Sep 2024',
  },
  {
    role: 'Multigrade Mentor',
    org: '',
    date: '',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return

        const borderEl = card.querySelector('.border-anim') as HTMLElement

        gsap.fromTo(
          card,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
            onComplete: () => {
              card.classList.add('visible')
              if (borderEl) {
                gsap.to(borderEl, {
                  height: '100%',
                  duration: 0.6,
                  ease: 'power2.out',
                })
              }
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 px-6"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-3xl mx-auto w-full">
        <SectionReveal>
          <h2 className="section-heading">Experience</h2>
        </SectionReveal>

        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
              className="experience-card opacity-0"
            >
              <div className="border-anim" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3
                    className="font-light"
                    style={{
                      color: '#666666',
                      fontSize: '0.95rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {exp.role}
                  </h3>
                  {exp.org && (
                    <p
                      className="font-light mt-1"
                      style={{
                        color: '#999999',
                        fontSize: '0.8rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {exp.org}
                    </p>
                  )}
                </div>
                {exp.date && (
                  <span
                    className="font-light whitespace-nowrap"
                    style={{
                      color: '#AAAAAA',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {exp.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
