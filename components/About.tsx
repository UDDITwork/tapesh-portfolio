'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionReveal from './SectionReveal'

gsap.registerPlugin(ScrollTrigger)

const paragraphs = [
  'Tapesh is an undergraduate engineering student at BIET Jhansi with a working interest in drone systems and aerial mapping. He coordinates The Drone Learner\'s Club, where students build, fly, and study unmanned aerial platforms.',
  'Before BIET, he spent time at IIT Patna studying computer science and data analytics, and at GBP Engineering College in mechanical engineering — collecting technical range before settling into his current trajectory.',
  'He has trained at IFFCO\'s Aonla plant on industrial processes including distillation columns and shell-and-tube heat exchangers. He holds a core membership at the Bureau of Indian Standards, serves as a liaison in the BIET Alumni Association, and teaches underprivileged children through SEWA.',
  'He represented IIT Roorkee\'s E-Summit as a campus ambassador and volunteered at the Bundelkhand Innovation and Incubation Center. He is a UP Scholarship recipient and has been certified by Canara Bank for investment knowledge.',
  'His work sits at the intersection of drone technology, process engineering, and student-led innovation.',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger paragraph reveals
      textRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        )
      })

      // Line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { width: '0%' },
          {
            width: '100%',
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center py-32 px-6"
      style={{ background: '#FAFAFA' }}
    >
      <div className="max-w-3xl mx-auto w-full">
        <SectionReveal>
          <h2 className="section-heading">About</h2>
        </SectionReveal>

        <div className="space-y-6">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              ref={(el) => { textRefs.current[i] = el }}
              className="text-text-body font-light leading-relaxed opacity-0"
              style={{
                fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                lineHeight: 1.8,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        <div className="mt-16">
          <div
            ref={lineRef}
            style={{
              height: '1px',
              background: '#A8D8EA',
              width: '0%',
            }}
          />
        </div>
      </div>
    </section>
  )
}
