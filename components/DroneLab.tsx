'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useInView } from 'framer-motion'
import SectionReveal from './SectionReveal'

gsap.registerPlugin(ScrollTrigger)

/* ─── Quadcopter top-view schematic (SVG) ─── */
function DroneSchematic() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex justify-center"
    >
      <svg
        viewBox="0 0 500 500"
        width="100%"
        style={{ maxWidth: 420 }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid background */}
        <defs>
          <pattern id="labGrid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#F0F0F0" strokeWidth="0.5" />
          </pattern>
          <pattern id="labGridMajor" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#E8E8E8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="500" fill="url(#labGrid)" />
        <rect width="500" height="500" fill="url(#labGridMajor)" />

        {/* Center body (octagon) */}
        <polygon
          points="235,230 250,222 265,230 265,248 265,270 250,278 235,270 235,248"
          stroke="#C0C0C0"
          strokeWidth="1"
          fill="none"
        />

        {/* Arms - 4 diagonal */}
        <line x1="260" y1="235" x2="370" y2="125" stroke="#C0C0C0" strokeWidth="0.8" />
        <line x1="240" y1="235" x2="130" y2="125" stroke="#C0C0C0" strokeWidth="0.8" />
        <line x1="260" y1="265" x2="370" y2="375" stroke="#C0C0C0" strokeWidth="0.8" />
        <line x1="240" y1="265" x2="130" y2="375" stroke="#C0C0C0" strokeWidth="0.8" />

        {/* Motor mounts (small squares) */}
        {[[370, 125], [130, 125], [370, 375], [130, 375]].map(([cx, cy], i) => (
          <rect key={i} x={cx - 6} y={cy - 6} width="12" height="12" stroke="#B0B0B0" strokeWidth="0.8" fill="none" />
        ))}

        {/* Propeller circles */}
        {[[370, 125], [130, 125], [370, 375], [130, 375]].map(([cx, cy], i) => (
          <g key={`prop-${i}`}>
            <circle cx={cx} cy={cy} r="55" stroke="#A8D8EA" strokeWidth="0.8" fill="none" strokeDasharray="4 3" />
            <circle cx={cx} cy={cy} r="55" stroke="#A8D8EA" strokeWidth="0.3" fill="none" opacity="0.3" />
          </g>
        ))}

        {/* Propeller rotation arrows */}
        {[[370, 125, 1], [130, 125, -1], [370, 375, -1], [130, 375, 1]].map(([cx, cy, dir], i) => (
          <path
            key={`arrow-${i}`}
            d={dir === 1
              ? `M ${cx + 40} ${cy - 38} A 55 55 0 0 1 ${cx + 52} ${cy - 15}`
              : `M ${cx - 40} ${cy - 38} A 55 55 0 0 0 ${cx - 52} ${cy - 15}`
            }
            stroke="#B0B0B0"
            strokeWidth="0.6"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        ))}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="3" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#B0B0B0" />
          </marker>
        </defs>

        {/* Thrust vectors (upward arrows at each motor) */}
        {[[370, 125], [130, 125], [370, 375], [130, 375]].map(([cx, cy], i) => (
          <g key={`thrust-${i}`}>
            <line x1={cx} y1={cy - 62} x2={cx} y2={cy - 82} stroke="#A8D8EA" strokeWidth="1" markerEnd="url(#thrustArrow)" />
            <text x={cx + 6} y={cy - 72} fill="#A8D8EA" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="300">
              T{i + 1}
            </text>
          </g>
        ))}
        <defs>
          <marker id="thrustArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0 6, 3 0, 6 6" fill="#A8D8EA" />
          </marker>
        </defs>

        {/* Center of gravity marker */}
        <circle cx="250" cy="250" r="3" fill="#A8D8EA" opacity="0.6" />
        <line x1="245" y1="250" x2="255" y2="250" stroke="#A8D8EA" strokeWidth="0.5" />
        <line x1="250" y1="245" x2="250" y2="255" stroke="#A8D8EA" strokeWidth="0.5" />

        {/* Coordinate frame at center */}
        <line x1="250" y1="250" x2="290" y2="250" stroke="#D0D0D0" strokeWidth="0.8" markerEnd="url(#axisArrow)" />
        <line x1="250" y1="250" x2="250" y2="210" stroke="#D0D0D0" strokeWidth="0.8" markerEnd="url(#axisArrow)" />
        <text x="293" y="254" fill="#B0B0B0" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="300">x</text>
        <text x="253" y="208" fill="#B0B0B0" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="300">y</text>
        <defs>
          <marker id="axisArrow" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
            <polygon points="0 5, 2.5 0, 5 5" fill="#D0D0D0" />
          </marker>
        </defs>

        {/* Dimension lines */}
        {/* Arm length */}
        <line x1="250" y1="250" x2="370" y2="125" stroke="none" />
        <line x1="256" y1="240" x2="330" y2="164" stroke="#D0D0D0" strokeWidth="0.4" strokeDasharray="3 2" />
        <text x="298" y="195" fill="#C0C0C0" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="300" transform="rotate(-45, 298, 195)">L = 0.25m</text>

        {/* Motor labels */}
        <text x="375" y="112" fill="#B0B0B0" fontSize="7.5" fontFamily="Inter, sans-serif" fontWeight="300">M1 (CW)</text>
        <text x="82" y="112" fill="#B0B0B0" fontSize="7.5" fontFamily="Inter, sans-serif" fontWeight="300">M2 (CCW)</text>
        <text x="375" y="392" fill="#B0B0B0" fontSize="7.5" fontFamily="Inter, sans-serif" fontWeight="300">M3 (CCW)</text>
        <text x="82" y="392" fill="#B0B0B0" fontSize="7.5" fontFamily="Inter, sans-serif" fontWeight="300">M4 (CW)</text>

        {/* Angular velocity labels */}
        {[[370, 125, '1'], [130, 125, '2'], [370, 375, '3'], [130, 375, '4']].map(([cx, cy, n], i) => (
          <text key={`omega-${i}`} x={Number(cx) - 4} y={Number(cy) + 4} fill="#C0C0C0" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="300" textAnchor="middle">
            {'\u03C9'}{n}
          </text>
        ))}

        {/* Title block bottom-right */}
        <rect x="340" y="440" width="150" height="50" stroke="#E0E0E0" strokeWidth="0.5" fill="rgba(255,255,255,0.8)" />
        <text x="350" y="455" fill="#C0C0C0" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="300">QUADCOPTER — TOP VIEW</text>
        <text x="350" y="467" fill="#D0D0D0" fontSize="6" fontFamily="Inter, sans-serif" fontWeight="300">Scale: 1:4 | Body Frame</text>
        <text x="350" y="479" fill="#D0D0D0" fontSize="6" fontFamily="Inter, sans-serif" fontWeight="300">DWG-001 Rev.A</text>
      </svg>
    </motion.div>
  )
}

/* ─── Single equation block ─── */
function EquationBlock({
  label,
  equation,
  description,
  index,
}: {
  label: string
  equation: React.ReactNode
  description: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      className="relative pl-4"
      style={{ borderLeft: '1px solid #E8E8E8' }}
    >
      <p
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#A8D8EA',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          fontWeight: 300,
        }}
      >
        {label}
      </p>
      <div
        style={{
          fontSize: '1.05rem',
          color: '#888888',
          fontFamily: "'Cambria Math', 'Times New Roman', Georgia, serif",
          letterSpacing: '0.02em',
          lineHeight: 1.8,
          fontWeight: 400,
        }}
      >
        {equation}
      </div>
      <p
        style={{
          fontSize: '0.7rem',
          color: '#BBBBBB',
          marginTop: '0.5rem',
          lineHeight: 1.6,
          fontWeight: 300,
        }}
      >
        {description}
      </p>
    </motion.div>
  )
}

/* ─── Animated horizontal rule ─── */
function LabDivider() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="py-8">
      <div ref={ref} style={{ height: '1px', background: '#E8E8E8', width: '0%' }} />
    </div>
  )
}

/* ─── Free body diagram side panel ─── */
function FreebodyDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <svg viewBox="0 0 300 360" width="100%" style={{ maxWidth: 280 }} fill="none">
        {/* Grid */}
        <defs>
          <pattern id="fbd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F3F3F3" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="300" height="360" fill="url(#fbd-grid)" />

        {/* Drone body simplified (side view) */}
        <rect x="100" y="160" width="100" height="8" rx="2" stroke="#C0C0C0" strokeWidth="0.8" fill="none" />

        {/* Left arm + motor */}
        <line x1="100" y1="164" x2="50" y2="164" stroke="#C0C0C0" strokeWidth="0.8" />
        <rect x="40" y="158" width="20" height="12" rx="1" stroke="#B0B0B0" strokeWidth="0.6" fill="none" />

        {/* Right arm + motor */}
        <line x1="200" y1="164" x2="250" y2="164" stroke="#C0C0C0" strokeWidth="0.8" />
        <rect x="240" y="158" width="20" height="12" rx="1" stroke="#B0B0B0" strokeWidth="0.6" fill="none" />

        {/* Propeller discs */}
        <ellipse cx="50" cy="155" rx="30" ry="3" stroke="#A8D8EA" strokeWidth="0.6" fill="none" strokeDasharray="3 2" />
        <ellipse cx="250" cy="155" rx="30" ry="3" stroke="#A8D8EA" strokeWidth="0.6" fill="none" strokeDasharray="3 2" />

        {/* Thrust arrows UP */}
        <line x1="50" y1="148" x2="50" y2="100" stroke="#A8D8EA" strokeWidth="1" markerEnd="url(#fbdUp)" />
        <text x="56" y="118" fill="#A8D8EA" fontSize="9" fontWeight="300" fontFamily="Inter, sans-serif">T</text>

        <line x1="250" y1="148" x2="250" y2="100" stroke="#A8D8EA" strokeWidth="1" markerEnd="url(#fbdUp)" />
        <text x="256" y="118" fill="#A8D8EA" fontSize="9" fontWeight="300" fontFamily="Inter, sans-serif">T</text>

        {/* Weight arrow DOWN from CG */}
        <circle cx="150" cy="168" r="2" fill="#D0D0D0" />
        <line x1="150" y1="172" x2="150" y2="240" stroke="#D0D0D0" strokeWidth="1" markerEnd="url(#fbdDown)" />
        <text x="156" y="218" fill="#C0C0C0" fontSize="9" fontWeight="300" fontFamily="Inter, sans-serif">mg</text>

        {/* Drag arrow (horizontal) */}
        <line x1="205" y1="168" x2="260" y2="168" stroke="#D0D0D0" strokeWidth="0.7" strokeDasharray="3 2" markerEnd="url(#fbdRight)" />
        <text x="230" y="182" fill="#D0D0D0" fontSize="7" fontWeight="300" fontFamily="Inter, sans-serif">Drag</text>

        {/* Torque arc */}
        <path d="M 130 145 A 25 25 0 0 1 170 145" stroke="#C0C0C0" strokeWidth="0.6" fill="none" markerEnd="url(#fbdRight)" />
        <text x="143" y="138" fill="#C0C0C0" fontSize="7" fontWeight="300" fontFamily="Inter, sans-serif">{'\u03C4'}</text>

        {/* Reference line (ground) */}
        <line x1="20" y1="290" x2="280" y2="290" stroke="#E0E0E0" strokeWidth="0.5" strokeDasharray="4 4" />
        <text x="240" y="304" fill="#D0D0D0" fontSize="6.5" fontWeight="300" fontFamily="Inter, sans-serif">ground</text>

        {/* Height dimension */}
        <line x1="30" y1="168" x2="30" y2="290" stroke="#D0D0D0" strokeWidth="0.4" />
        <line x1="27" y1="168" x2="33" y2="168" stroke="#D0D0D0" strokeWidth="0.4" />
        <line x1="27" y1="290" x2="33" y2="290" stroke="#D0D0D0" strokeWidth="0.4" />
        <text x="14" y="235" fill="#D0D0D0" fontSize="7" fontWeight="300" fontFamily="Inter, sans-serif" transform="rotate(-90, 14, 235)">h(t)</text>

        {/* Title */}
        <text x="15" y="340" fill="#C0C0C0" fontSize="7" fontWeight="300" fontFamily="Inter, sans-serif" letterSpacing="0.15em">FREE BODY DIAGRAM — SIDE VIEW</text>
        <text x="15" y="352" fill="#D0D0D0" fontSize="6" fontWeight="300" fontFamily="Inter, sans-serif">Hover equilibrium condition</text>

        <defs>
          <marker id="fbdUp" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
            <polygon points="0 6, 3 0, 6 6" fill="#A8D8EA" />
          </marker>
          <marker id="fbdDown" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
            <polygon points="0 0, 3 6, 6 0" fill="#D0D0D0" />
          </marker>
          <marker id="fbdRight" markerWidth="5" markerHeight="5" refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill="#D0D0D0" />
          </marker>
        </defs>
      </svg>
    </motion.div>
  )
}

/* ─── Signal flow block diagram ─── */
function ControlLoopDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="mt-8"
    >
      <svg viewBox="0 0 600 140" width="100%" fill="none">
        {/* Blocks */}
        {/* Setpoint */}
        <text x="0" y="68" fill="#B0B0B0" fontSize="9" fontWeight="300" fontFamily="Inter, sans-serif">r(t)</text>

        {/* Summing junction */}
        <circle cx="50" cy="65" r="10" stroke="#C0C0C0" strokeWidth="0.7" fill="none" />
        <line x1="46" y1="65" x2="54" y2="65" stroke="#C0C0C0" strokeWidth="0.5" />
        <line x1="50" y1="61" x2="50" y2="69" stroke="#C0C0C0" strokeWidth="0.5" />
        <text x="39" y="55" fill="#B0B0B0" fontSize="6" fontWeight="300">+</text>
        <text x="44" y="82" fill="#B0B0B0" fontSize="6" fontWeight="300">{'\u2212'}</text>

        {/* Arrow to summing junction */}
        <line x1="20" y1="65" x2="40" y2="65" stroke="#C0C0C0" strokeWidth="0.6" markerEnd="url(#clArrow)" />

        {/* Error signal */}
        <line x1="60" y1="65" x2="110" y2="65" stroke="#C0C0C0" strokeWidth="0.6" markerEnd="url(#clArrow)" />
        <text x="72" y="58" fill="#A8D8EA" fontSize="7" fontWeight="300" fontFamily="Inter, sans-serif">e(t)</text>

        {/* PID Controller block */}
        <rect x="115" y="48" width="80" height="34" stroke="#A8D8EA" strokeWidth="0.8" fill="none" />
        <text x="125" y="69" fill="#999999" fontSize="8.5" fontWeight="300" fontFamily="'Cambria Math', serif">PID Controller</text>

        {/* Arrow to plant */}
        <line x1="195" y1="65" x2="250" y2="65" stroke="#C0C0C0" strokeWidth="0.6" markerEnd="url(#clArrow)" />
        <text x="208" y="58" fill="#B0B0B0" fontSize="7" fontWeight="300" fontFamily="Inter, sans-serif">u(t)</text>

        {/* Plant / Motor Dynamics */}
        <rect x="255" y="48" width="90" height="34" stroke="#C0C0C0" strokeWidth="0.8" fill="none" />
        <text x="262" y="69" fill="#999999" fontSize="8.5" fontWeight="300" fontFamily="'Cambria Math', serif">Motor + Rotor</text>

        {/* Arrow to drone */}
        <line x1="345" y1="65" x2="395" y2="65" stroke="#C0C0C0" strokeWidth="0.6" markerEnd="url(#clArrow)" />

        {/* Drone dynamics */}
        <rect x="400" y="48" width="90" height="34" stroke="#C0C0C0" strokeWidth="0.8" fill="none" />
        <text x="408" y="69" fill="#999999" fontSize="8.5" fontWeight="300" fontFamily="'Cambria Math', serif">Drone Body</text>

        {/* Output */}
        <line x1="490" y1="65" x2="560" y2="65" stroke="#C0C0C0" strokeWidth="0.6" markerEnd="url(#clArrow)" />
        <text x="565" y="68" fill="#B0B0B0" fontSize="9" fontWeight="300" fontFamily="Inter, sans-serif">y(t)</text>

        {/* Feedback path */}
        <line x1="530" y1="65" x2="530" y2="120" stroke="#C0C0C0" strokeWidth="0.6" />
        <line x1="530" y1="120" x2="50" y2="120" stroke="#C0C0C0" strokeWidth="0.6" />
        <line x1="50" y1="120" x2="50" y2="75" stroke="#C0C0C0" strokeWidth="0.6" markerEnd="url(#clArrowUp)" />

        {/* Sensor block on feedback */}
        <rect x="270" y="108" width="60" height="24" stroke="#D0D0D0" strokeWidth="0.6" fill="none" />
        <text x="278" y="123" fill="#B0B0B0" fontSize="7.5" fontWeight="300" fontFamily="Inter, sans-serif">IMU/GPS</text>

        {/* Label */}
        <text x="0" y="12" fill="#D0D0D0" fontSize="7" fontWeight="300" fontFamily="Inter, sans-serif" letterSpacing="0.15em">CLOSED-LOOP ATTITUDE CONTROL</text>

        <defs>
          <marker id="clArrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill="#C0C0C0" />
          </marker>
          <marker id="clArrowUp" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
            <polygon points="0 5, 2.5 0, 5 5" fill="#C0C0C0" />
          </marker>
        </defs>
      </svg>
    </motion.div>
  )
}

/* ─── Main component ─── */
export default function DroneLab() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: '#FAFAFA' }}
    >
      {/* Faint corner technical markings */}
      <div
        className="absolute top-6 left-6"
        style={{ color: '#E0E0E0', fontSize: '0.55rem', letterSpacing: '0.2em', fontWeight: 300 }}
      >
        SEC-06 // FLIGHT DYNAMICS
      </div>
      <div
        className="absolute top-6 right-6"
        style={{ color: '#E0E0E0', fontSize: '0.55rem', letterSpacing: '0.2em', fontWeight: 300 }}
      >
        REF: QUAD-UAV-2025
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <SectionReveal>
          <h2 className="section-heading">Flight Dynamics</h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p
            className="font-light mb-16"
            style={{
              color: '#AAAAAA',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              lineHeight: 1.7,
              maxWidth: '40rem',
            }}
          >
            The mathematics governing quadrotor flight — from individual rotor thrust to
            full six-degree-of-freedom attitude control. These equations inform every
            aspect of platform design, from motor selection to PID tuning.
          </p>
        </SectionReveal>

        {/* Top section: Schematic + Equations side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left: Top-view schematic */}
          <DroneSchematic />

          {/* Right: Core equations */}
          <div className="space-y-8">
            <EquationBlock
              index={0}
              label="Rotor Thrust"
              equation={
                <span>T<sub>i</sub> = k<sub>T</sub> &middot; &omega;<sub>i</sub>&sup2;</span>
              }
              description="Each rotor generates thrust proportional to the square of its angular velocity. kT is the thrust coefficient determined by blade geometry and air density."
            />

            <EquationBlock
              index={1}
              label="Hover Equilibrium"
              equation={
                <span>&Sigma;T<sub>i</sub> = mg &nbsp;&rArr;&nbsp; 4k<sub>T</sub>&omega;<sub>h</sub>&sup2; = mg</span>
              }
              description="At hover, total thrust from all four rotors exactly balances gravitational force. This defines the baseline angular velocity for stable flight."
            />

            <EquationBlock
              index={2}
              label="Net Torque (Yaw)"
              equation={
                <span>&tau;<sub>z</sub> = k<sub>D</sub>(&omega;<sub>1</sub>&sup2; &minus; &omega;<sub>2</sub>&sup2; + &omega;<sub>3</sub>&sup2; &minus; &omega;<sub>4</sub>&sup2;)</span>
              }
              description="Yaw torque arises from differential drag between CW and CCW rotor pairs. kD is the drag coefficient of each blade."
            />

            <EquationBlock
              index={3}
              label="Roll Moment"
              equation={
                <span>&tau;<sub>&phi;</sub> = L &middot; k<sub>T</sub>(&omega;<sub>4</sub>&sup2; &minus; &omega;<sub>2</sub>&sup2;)</span>
              }
              description="Roll is generated by thrust differential between left and right rotor pairs, scaled by arm length L from the center of mass."
            />
          </div>
        </div>

        <LabDivider />

        {/* Middle section: Newton-Euler + Free body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <EquationBlock
              index={0}
              label="Newton-Euler (Translational)"
              equation={
                <div>
                  <div>m &middot; a = R &middot; F<sub>thrust</sub> &minus; mg &middot; e<sub>3</sub> &minus; F<sub>drag</sub></div>
                </div>
              }
              description="Translational dynamics in the world frame. R is the rotation matrix from body to world frame. The thrust vector is rotated by current attitude before summing with gravity and aerodynamic drag."
            />

            <EquationBlock
              index={1}
              label="Rotation Matrix (Z-Y-X Euler)"
              equation={
                <div style={{ fontSize: '0.85rem', lineHeight: 2 }}>
                  <div>R = R<sub>z</sub>(&psi;) &middot; R<sub>y</sub>(&theta;) &middot; R<sub>x</sub>(&phi;)</div>
                  <div style={{ fontSize: '0.75rem', color: '#AAAAAA', marginTop: '0.25rem' }}>
                    &phi; : roll &nbsp;&nbsp; &theta; : pitch &nbsp;&nbsp; &psi; : yaw
                  </div>
                </div>
              }
              description="Attitude is parameterized using Tait-Bryan angles. The rotation matrix maps body-frame forces and torques into the inertial reference frame."
            />

            <EquationBlock
              index={2}
              label="Euler's Rotation Equation"
              equation={
                <span>I &middot; &alpha; + &omega; &times; (I &middot; &omega;) = &tau;</span>
              }
              description="Rotational dynamics relating angular acceleration to applied torques, accounting for gyroscopic coupling via the cross-product term."
            />
          </div>

          {/* Right: Free body diagram */}
          <div className="flex flex-col items-center justify-center">
            <FreebodyDiagram />
          </div>
        </div>

        <LabDivider />

        {/* Bottom section: PID Control */}
        <div className="mb-8">
          <EquationBlock
            index={0}
            label="PID Control Law"
            equation={
              <div style={{ lineHeight: 2.2 }}>
                <div>
                  u(t) = K<sub>p</sub> &middot; e(t) &nbsp;+&nbsp; K<sub>i</sub> &middot; &int;<sub>0</sub><sup>t</sup> e(&tau;) d&tau; &nbsp;+&nbsp; K<sub>d</sub> &middot; <sup>de(t)</sup>&frasl;<sub>dt</sub>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#BBBBBB', marginTop: '0.25rem' }}>
                  where &nbsp; e(t) = r(t) &minus; y(t) &nbsp;&nbsp;|&nbsp;&nbsp; r: setpoint &nbsp;&nbsp; y: measured state
                </div>
              </div>
            }
            description="Each axis (roll, pitch, yaw, altitude) runs an independent PID loop. Gains Kp, Ki, Kd are tuned per-axis to achieve stable, responsive flight without oscillation."
          />
        </div>

        {/* Control loop block diagram */}
        <ControlLoopDiagram />

        {/* Technical footnote */}
        <div className="mt-16 pt-6" style={{ borderTop: '1px solid #F0F0F0' }}>
          <p
            style={{
              fontSize: '0.6rem',
              color: '#D0D0D0',
              letterSpacing: '0.15em',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Reference frame conventions follow NED (North-East-Down). Rotor numbering is
            clockwise from front-right. All equations assume rigid body dynamics with
            negligible blade flapping. Aerodynamic coefficients are empirically determined
            through static thrust testing.
          </p>
        </div>
      </div>
    </section>
  )
}
