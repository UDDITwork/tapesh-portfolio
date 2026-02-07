'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function DroneWireframe({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)
  const time = useRef(0)

  const droneGeometry = useMemo(() => {
    const points: [number, number, number][] = []
    const lines: [number, number][] = []

    // Central body — octagonal prism
    const bodyRadius = 0.3
    const bodyHeight = 0.12
    const bodySegments = 8
    const bodyTop: number[] = []
    const bodyBottom: number[] = []

    for (let i = 0; i < bodySegments; i++) {
      const angle = (i / bodySegments) * Math.PI * 2
      const x = Math.cos(angle) * bodyRadius
      const z = Math.sin(angle) * bodyRadius
      const topIdx = points.length
      points.push([x, bodyHeight / 2, z])
      bodyTop.push(topIdx)
      const bottomIdx = points.length
      points.push([x, -bodyHeight / 2, z])
      bodyBottom.push(bottomIdx)
    }

    // Connect body top/bottom rings and verticals
    for (let i = 0; i < bodySegments; i++) {
      lines.push([bodyTop[i], bodyTop[(i + 1) % bodySegments]])
      lines.push([bodyBottom[i], bodyBottom[(i + 1) % bodySegments]])
      lines.push([bodyTop[i], bodyBottom[i]])
    }

    // 4 arms extending outward
    const armLength = 1.2
    const armDirs = [
      [1, 0, 1],
      [1, 0, -1],
      [-1, 0, 1],
      [-1, 0, -1],
    ]

    const motorPositions: [number, number, number][] = []

    armDirs.forEach((dir) => {
      const nx = dir[0] / Math.sqrt(2)
      const nz = dir[2] / Math.sqrt(2)

      // Arm is a thin box (two lines — top and bottom)
      const armStart1 = points.length
      points.push([nx * bodyRadius * 0.8, 0.03, nz * bodyRadius * 0.8])
      const armEnd1 = points.length
      points.push([nx * armLength, 0.03, nz * armLength])
      lines.push([armStart1, armEnd1])

      const armStart2 = points.length
      points.push([nx * bodyRadius * 0.8, -0.03, nz * bodyRadius * 0.8])
      const armEnd2 = points.length
      points.push([nx * armLength, -0.03, nz * armLength])
      lines.push([armStart2, armEnd2])

      // Connect arm ends
      lines.push([armEnd1, armEnd2])
      lines.push([armStart1, armStart2])

      motorPositions.push([nx * armLength, 0.03, nz * armLength])
    })

    // Propeller circles at each motor
    const propRadius = 0.35
    const propSegments = 24

    motorPositions.forEach((pos) => {
      const circlePoints: number[] = []
      for (let i = 0; i < propSegments; i++) {
        const angle = (i / propSegments) * Math.PI * 2
        const idx = points.length
        points.push([
          pos[0] + Math.cos(angle) * propRadius,
          pos[1] + 0.05,
          pos[2] + Math.sin(angle) * propRadius,
        ])
        circlePoints.push(idx)
      }
      for (let i = 0; i < propSegments; i++) {
        lines.push([circlePoints[i], circlePoints[(i + 1) % propSegments]])
      }
      // Motor post
      const motorBottom = points.length
      points.push([pos[0], pos[1] - 0.06, pos[2]])
      const motorTop = points.length
      points.push([pos[0], pos[1] + 0.05, pos[2]])
      lines.push([motorBottom, motorTop])
    })

    // Landing gear — two short skids beneath
    const skidY = -bodyHeight / 2 - 0.15
    const skidPairs: [[number, number, number], [number, number, number]][] = [
      [[-0.4, skidY, -0.1], [0.4, skidY, -0.1]],
      [[-0.4, skidY, 0.1], [0.4, skidY, 0.1]],
    ]

    skidPairs.forEach((skid) => {
      const s1 = points.length
      points.push(skid[0])
      const s2 = points.length
      points.push(skid[1])
      lines.push([s1, s2])
    })

    // Legs connecting body to skids
    const legPairs: [[number, number, number], [number, number, number]][] = [
      [[-0.2, -bodyHeight / 2, -0.1], [-0.3, skidY, -0.1]],
      [[0.2, -bodyHeight / 2, -0.1], [0.3, skidY, -0.1]],
      [[-0.2, -bodyHeight / 2, 0.1], [-0.3, skidY, 0.1]],
      [[0.2, -bodyHeight / 2, 0.1], [0.3, skidY, 0.1]],
    ]

    legPairs.forEach((leg) => {
      const l1 = points.length
      points.push(leg[0])
      const l2 = points.length
      points.push(leg[1])
      lines.push([l1, l2])
    })

    return { points, lines }
  }, [])

  const lineGeometries = useMemo(() => {
    const positions = new Float32Array(droneGeometry.lines.length * 6)
    droneGeometry.lines.forEach((line, i) => {
      const p1 = droneGeometry.points[line[0]]
      const p2 = droneGeometry.points[line[1]]
      positions[i * 6] = p1[0]
      positions[i * 6 + 1] = p1[1]
      positions[i * 6 + 2] = p1[2]
      positions[i * 6 + 3] = p2[0]
      positions[i * 6 + 4] = p2[1]
      positions[i * 6 + 5] = p2[2]
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [droneGeometry])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    time.current += delta

    // Gentle bob
    groupRef.current.position.y = Math.sin(time.current * 0.8) * 0.05

    // Slow rotation
    groupRef.current.rotation.y += delta * 0.15

    // Mouse parallax tilt
    const targetRotX = -mouse.current.y * 0.15
    const targetRotZ = mouse.current.x * 0.1
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.05
  })

  return (
    <group ref={groupRef} scale={1.8}>
      {/* Main wireframe */}
      <lineSegments geometry={lineGeometries}>
        <lineBasicMaterial color="#D0D0D0" transparent opacity={0.7} />
      </lineSegments>
      {/* Glow overlay */}
      <lineSegments geometry={lineGeometries}>
        <lineBasicMaterial color="#A8D8EA" transparent opacity={0.15} linewidth={1} />
      </lineSegments>
    </group>
  )
}

function GridPlane() {
  const gridRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!gridRef.current) return
    gridRef.current.position.z += delta * 0.05
    if (gridRef.current.position.z > 1) {
      gridRef.current.position.z = 0
    }
  })

  return (
    <group ref={gridRef} position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[40, 40, '#E8E8E8', '#F0F0F0']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0.5, 4)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.5} />
      <DroneWireframe mouse={mouse} />
      <GridPlane />
    </>
  )
}

export default function DroneScene() {
  const mouse = useRef({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <div className="three-canvas-wrapper">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
