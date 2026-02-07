'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useInView } from 'framer-motion'
import SectionReveal from './SectionReveal'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    degree: 'BTech',
    institution: 'BIET Jhansi',
    date: 'Sep 2024 – Sep 2028',
  },
  {
    degree: 'BS, CS & Data Analytics',
    institution: 'IIT Patna',
    date: 'May – Aug 2024',
  },
  {
    degree: 'BTech, Mechanical',
    institution: 'GBP Engineering College',
    date: 'Jul – Sep 2024',
  },
  {
    degree: 'JEE Preparation',
    institution: 'Unacademy',
    date: 'Apr 2023 – Feb 2024',
  },
]

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof education)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="relative pl-10 pb-12 last:pb-0">
      {/* Dot */}
      <div
        className={`timeline-dot absolute left-0 top-1 ${isInView ? 'visible' : ''}`}
        style={{ transform: `translateX(-4px)` }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
          delay: index * 0.1,
        }}
      >
        <h3
          className="font-light"
          style={{
            color: '#666666',
            fontSize: '0.95rem',
            letterSpacing: '0.05em',
          }}
        >
          {entry.degree}
        </h3>
        <p
          className="font-light mt-1"
          style={{
            color: '#999999',
            fontSize: '0.8rem',
            letterSpacing: '0.03em',
          }}
        >
          {entry.institution}
        </p>
        <span
          className="font-light mt-1 inline-block"
          style={{
            color: '#AAAAAA',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
          }}
        >
          {entry.date}
        </span>
      </motion.div>
    </div>
  )
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: '0%' },
          {
            height: '100%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-32 px-6"
      style={{ background: '#FAFAFA' }}
    >
      <div className="max-w-3xl mx-auto w-full">
        <SectionReveal>
          <h2 className="section-heading">Education</h2>
        </SectionReveal>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-0 w-0.5"
            style={{
              background: '#E0E0E0',
              height: '100%',
            }}
          />
          <div
            ref={lineRef}
            className="absolute left-0 top-0 w-0.5"
            style={{
              background: '#A8D8EA',
              height: '0%',
            }}
          />

          {/* Entries */}
          {education.map((entry, i) => (
            <TimelineEntry key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
