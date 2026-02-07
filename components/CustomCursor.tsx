'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return

    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.classList.contains('interactive') ||
        el.classList.contains('skill-item')
      ) {
        cursor.classList.add('hovering')
      }
    }

    const handleMouseOut = () => {
      cursor.classList.remove('hovering')
    }

    let raf: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (cursor) {
        cursor.style.left = `${pos.current.x}px`
        cursor.style.top = `${pos.current.y}px`
      }

      raf = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" />
}
