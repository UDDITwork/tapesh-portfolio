'use client'

import SectionReveal from './SectionReveal'

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-32 px-6"
      style={{ background: '#FAFAFA' }}
    >
      <div className="max-w-3xl mx-auto w-full">
        <SectionReveal>
          <h2 className="section-heading">Contact</h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="space-y-4">
            <p
              className="font-light"
              style={{
                color: '#999999',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
              }}
            >
              <a
                href="https://www.linkedin.com/in/tapesh-480024336"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive contact-link"
                style={{
                  color: '#666666',
                  cursor: 'none',
                }}
              >
                www.linkedin.com/in/tapesh-480024336
              </a>
            </p>

            <p
              className="font-light"
              style={{
                color: '#AAAAAA',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
              }}
            >
              Jhansi, Uttar Pradesh, India
            </p>
          </div>
        </SectionReveal>

        {/* Footer */}
        <div className="mt-32 pt-8" style={{ borderTop: '1px solid #E0E0E0' }}>
          <p
            className="font-light text-center"
            style={{
              color: '#CCCCCC',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
            }}
          >
            Built with precision.
          </p>
        </div>
      </div>
    </section>
  )
}
