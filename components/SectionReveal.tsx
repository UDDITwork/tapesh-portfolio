'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
