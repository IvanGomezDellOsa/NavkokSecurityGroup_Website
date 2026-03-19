"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import { Users, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const GRID_SIZE = 8
const TOTAL_TILES = GRID_SIZE * GRID_SIZE

// Deterministic pseudo-random based on index (avoids hydration mismatch)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

function generateTileData(index: number) {
  const r1 = seededRandom(index + 1)
  const r2 = seededRandom(index + 50)
  const r3 = seededRandom(index + 100)
  const r4 = seededRandom(index + 150)

  // Scatter radius: tiles farther from center scatter more
  const col = index % GRID_SIZE
  const row = Math.floor(index / GRID_SIZE)
  const centerDist = Math.sqrt(
    Math.pow(col - GRID_SIZE / 2, 2) + Math.pow(row - GRID_SIZE / 2, 2)
  )
  const scatterMultiplier = 0.6 + (centerDist / (GRID_SIZE / 2)) * 0.6

  return {
    // Scatter position (in viewport-relative units)
    tx: (r1 - 0.5) * 600 * scatterMultiplier,
    ty: (r2 - 0.5) * 500 * scatterMultiplier,
    // Rotation
    rotate: (r3 - 0.5) * 360,
    // Scale variation
    scale: 0.3 + r4 * 0.5,
    // Stagger delay for assembly (center tiles arrive last for dramatic effect)
    delay: (1 - centerDist / (GRID_SIZE * 0.7)) * 0.35 + r1 * 0.15,
  }
}

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.15, ...options }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}

export function WorkWithUsSection() {
  const sectionView = useInView()
  const qrView = useInView()
  const [mounted, setMounted] = useState(false)
  const [assembled, setAssembled] = useState(false)
  const [breathComplete, setBreathComplete] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate tile data once (deterministic, SSR-safe)
  const tiles = useMemo(
    () => Array.from({ length: TOTAL_TILES }, (_, i) => generateTileData(i)),
    []
  )

  // Mark as mounted (client-only) to apply scatter transforms
  useEffect(() => {
    setMounted(true)
  }, [])

  // Trigger assembly when QR area comes into view
  useEffect(() => {
    if (qrView.isInView && !assembled && mounted) {
      setAssembled(true)
      // "Breath" pulse after all tiles land (~1.2s max delay + 0.8s transition)
      const timer = setTimeout(() => setBreathComplete(true), 3200)
      return () => clearTimeout(timer)
    }
  }, [qrView.isInView, assembled, mounted])

  // Subtle 3D tilt on hover (desktop only)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          ref={sectionView.ref}
          className={`text-center mb-20 transition-all duration-1000 ${
            sectionView.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs uppercase tracking-[0.2em]">
              Oportunidades
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight mb-6">
            Trabajá{" "}
            <span className="text-gradient font-normal">con nosotros</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Somos un equipo en constante crecimiento. Si querés formar parte,{" "}
            <span className="text-gradient font-medium">escaneá o clickeá el QR</span>{" "}
            y completá el formulario, nuestro equipo evaluará tu postulación.
          </p>
        </div>

        {/* QR Reveal Area */}
        <div
          ref={qrView.ref}
          className="flex flex-col items-center justify-center"
        >
          {/* QR Container with 3D tilt */}
          <div
            ref={containerRef}
            className="relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: breathComplete
                ? `rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`
                : undefined,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Glow behind QR */}
            <div
              className={cn(
                "absolute -inset-8 rounded-3xl transition-all duration-1000",
                assembled
                  ? "bg-primary/10 blur-3xl opacity-100"
                  : "bg-primary/5 blur-xl opacity-0"
              )}
            />

            {/* QR Assembly Grid */}
            <a
              href="https://forms.gle/tXZHumEnYHkxgexu8"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
            <div
              className="relative w-[280px] h-[330px] sm:w-[320px] sm:h-[376px] md:w-[380px] md:h-[447px]"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              }}
            >
              {tiles.map((tile, index) => {
                const col = index % GRID_SIZE
                const row = Math.floor(index / GRID_SIZE)
                const bgPosX = (col / (GRID_SIZE - 1)) * 100
                const bgPosY = (row / (GRID_SIZE - 1)) * 100

                // Three states: server (hidden) → scattered (mounted) → assembled
                const isScattered = mounted && !assembled
                const isAssembled = mounted && assembled

                return (
                  <div
                    key={index}
                    className="relative overflow-hidden"
                    style={{
                      // Each tile shows its portion of the QR image
                      backgroundImage: `url('/images/sections_image/QR_trabajo.png')`,
                      backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                      backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                      // Transition with spring-like cubic-bezier
                      transition: isAssembled
                        ? `transform ${0.9 + tile.delay * 0.5}s cubic-bezier(0.34, 1.56, 0.64, 1) ${tile.delay * 0.5}s, opacity ${0.4}s ease ${tile.delay * 0.3}s`
                        : isScattered
                          ? "none"
                          : "none",
                      // Server: no transform. Scattered: random. Assembled: grid.
                      transform: isAssembled
                        ? "translate(0, 0) rotate(0deg) scale(1)"
                        : isScattered
                          ? `translate(${tile.tx}px, ${tile.ty}px) rotate(${tile.rotate}deg) scale(${tile.scale})`
                          : "none",
                      opacity: isAssembled ? 1 : isScattered ? 0.6 : 0,
                      willChange: isScattered ? "transform, opacity" : "auto",
                    }}
                  />
                )
              })}

              {/* Real QR image overlay for perfect scannability */}
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 z-10",
                  breathComplete ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src="/images/sections_image/QR_trabajo.png"
                  alt="QR - Sumate al equipo de Navkok Security Group"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
                />
              </div>
            </div>
            </a>
            {/* "Breath" pulse ring when assembly completes */}
            <div
              className={cn(
                "absolute inset-0 rounded-2xl border-2 border-primary/25 pointer-events-none transition-all",
                breathComplete
                  ? "animate-qr-breath opacity-100"
                  : "opacity-0 scale-100"
              )}
            />

            {/* Corner accent decorations (appear after assembly) */}
            <div
              className={cn(
                "absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/25 transition-all duration-500",
                breathComplete
                  ? "opacity-100 translate-x-0 translate-y-0"
                  : "opacity-0 translate-x-2 translate-y-2"
              )}
            />
            <div
              className={cn(
                "absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-primary/25 transition-all duration-500",
                breathComplete
                  ? "opacity-100 translate-x-0 translate-y-0"
                  : "opacity-0 -translate-x-2 translate-y-2"
              )}
            />
            <div
              className={cn(
                "absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-primary/25 transition-all duration-500",
                breathComplete
                  ? "opacity-100 translate-x-0 translate-y-0"
                  : "opacity-0 translate-x-2 -translate-y-2"
              )}
            />
            <div
              className={cn(
                "absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-primary/25 transition-all duration-500",
                breathComplete
                  ? "opacity-100 translate-x-0 translate-y-0"
                  : "opacity-0 -translate-x-2 -translate-y-2"
              )}
            />
          </div>

          {/* Label below QR */}
          <div
            className={cn(
              "mt-10 text-center transition-all duration-700",
              breathComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary/80">
                Escaneá el código QR para postularte
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fallback for no-JS */}
      <noscript>
        <div className="flex justify-center py-12">
          <img
            src="/images/sections_image/QR_trabajo.png"
            alt="QR - Sumate al equipo de Navkok Security Group"
            width={320}
            height={320}
            style={{ objectFit: "contain" }}
          />
        </div>
      </noscript>
    </section>
  )
}
