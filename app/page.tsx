'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const PageOverlay = dynamic(() => import('@/components/PageOverlay'), { ssr: false })

export default function Home() {
  return (
    <>
      <PageOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
