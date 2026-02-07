'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = 'none'
            overlayRef.current.style.display = 'none'
          }
        },
      })
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="page-overlay"
      style={{ opacity: 1 }}
    />
  )
}
