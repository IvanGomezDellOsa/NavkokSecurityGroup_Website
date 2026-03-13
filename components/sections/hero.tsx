"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown, Shield, Sparkles } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section 
      ref={heroRef}
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background - More visible */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        
        {/* Reduced overlay opacity for more video visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent z-10" />
        
        {/* Animated particles effect - using fixed positions to avoid hydration mismatch */}
        <div className="absolute inset-0 z-20 overflow-hidden">
          {[
            { left: 10, top: 20, delay: 0, duration: 5 },
            { left: 25, top: 70, delay: 1.2, duration: 6 },
            { left: 40, top: 35, delay: 2.5, duration: 4.5 },
            { left: 55, top: 85, delay: 0.8, duration: 7 },
            { left: 70, top: 15, delay: 3.1, duration: 5.5 },
            { left: 85, top: 55, delay: 1.8, duration: 6.5 },
            { left: 15, top: 90, delay: 4.2, duration: 4 },
            { left: 35, top: 50, delay: 2.1, duration: 7.5 },
            { left: 60, top: 40, delay: 0.5, duration: 5.2 },
            { left: 80, top: 75, delay: 3.8, duration: 6.2 },
            { left: 5, top: 60, delay: 1.5, duration: 4.8 },
            { left: 45, top: 10, delay: 2.8, duration: 5.8 },
            { left: 90, top: 30, delay: 4.5, duration: 6.8 },
            { left: 20, top: 45, delay: 0.3, duration: 7.2 },
            { left: 75, top: 95, delay: 3.5, duration: 4.2 },
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive glow that follows mouse */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full z-15 pointer-events-none transition-all duration-500 ease-out"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          }}
        />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 z-20 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 text-center pt-32 pb-32">
        {/* Logo with enhanced glow */}
        <div className={`mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative inline-block group">
            <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-150 group-hover:scale-175 transition-transform duration-700" />
            <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full scale-125 animate-pulse" />
            <Image
              src="/images/logo.png"
              alt="Navkok Security Group"
              width={240}
              height={240}
              className="relative w-[180px] md:w-[240px] h-auto drop-shadow-2xl animate-float"
              priority
            />
          </div>
        </div>

        {/* Main headline with stagger animation */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary animate-line-grow" />
            <Shield className="w-6 h-6 text-primary animate-pulse" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary animate-line-grow" />
          </div>
          
          <h1 className="font-sans text-4xl md:text-6xl lg:text-8xl font-extralight tracking-tight mb-6">
            <span className="block text-gradient font-normal mb-2 animate-text-shimmer bg-clip-text">Navkok</span>
            <span className="block text-foreground">Security Group SRL</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Definiendo los estandares de excelencia en seguridad privada en Argentina
          </p>
          
          {/* Animated location tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["CABA", "Buenos Aires", "Mendoza", "Rio Negro", "Neuquen"].map((loc, i) => (
              <span 
                key={loc} 
                className="px-4 py-2 border border-primary/20 rounded-full text-sm text-primary/80 hover:border-primary/60 hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - positioned at the very bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <a href="#nosotros" className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
          <span className="text-[10px] uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-primary/30 flex items-start justify-center p-2 group-hover:border-primary/60 transition-colors">
            <div className="w-1 h-2 bg-primary rounded-full animate-scroll-indicator" />
          </div>
        </a>
      </div>

      {/* Corner accents with glow */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 w-20 md:w-32 h-20 md:h-32 z-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
      <div className="absolute top-6 right-6 md:top-10 md:right-10 w-20 md:w-32 h-20 md:h-32 z-30">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-primary/50 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-20 md:w-32 h-20 md:h-32 z-30">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-primary/50 to-transparent" />
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-20 md:w-32 h-20 md:h-32 z-30">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-primary/50 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-primary/50 to-transparent" />
      </div>
    </section>
  )
}
