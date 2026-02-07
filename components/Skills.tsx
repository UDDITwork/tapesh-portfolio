'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionReveal from './SectionReveal'

const skills = [
  'Distillation Column Operator',
  'Shell & Tube Heat Exchangers',
  'CSTRs',
]

const recognitions = [
  'Canara Bank — Certified for Investment',
  'UP Scholarship Recipient',
]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 px-6"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-3xl mx-auto w-full">
        <SectionReveal>
          <h2 className="section-heading">Skills & Recognition</h2>
        </SectionReveal>

        {/* Skills */}
        <div className="flex flex-wrap gap-x-10 gap-y-4 mb-16">
          {skills.map((skill, i) => (
            <motion.span
              key={i}
              className="skill-item interactive"
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                cursor: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Recognition */}
        <div className="space-y-3">
          {recognitions.map((item, i) => (
            <motion.p
              key={i}
              className="font-light"
              style={{
                color: '#999999',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + i * 0.2,
                ease: 'easeOut',
              }}
            >
              {item}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
