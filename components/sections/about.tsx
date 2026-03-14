"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, Users, MapPin, Target, Eye, CheckCircle, User, Shield, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    icon: Award,
    value: 30,
    suffix: "+",
    label: "Años de experiencia",
    sublabel: "en fuerzas policiales",
  },
  {
    icon: Users,
    value: 20,
    suffix: "+",
    label: "Años custodiando",
    sublabel: "Club San Lorenzo de Almagro",
  },
  {
    icon: MapPin,
    value: 5,
    suffix: "",
    label: "Provincias",
    sublabel: "habilitadas",
  },
]

const qualityActions = [
  "Proveer servicios que cumplan con los requisitos legales, esforzándonos por ir más allá de las necesidades y expectativas de nuestros clientes.",
  "Lograr la integración y participación de todo el personal a través de la comunicación y formación continua.",
  "Mejorar en forma continua el Sistema de Gestión de Calidad (SGC) y los procesos internos de la organización.",
]

const certifications = [
  { name: "ISO 9001:2015", description: "Gestión de Calidad" },
  { name: "ISO 14001", description: "Gestión Ambiental" },
  { name: "ISO 45001", description: "Seguridad y Salud" },
]

const clients = [
  { name: "San Lorenzo de Almagro", logo: "/images/logos/logo__san_lorenzo.webp" },
  { name: "AESA", logo: "/images/logos/logo__AESA.webp" },
  { name: "Constructora Sudamericana", logo: "/images/logos/logo__constructora_sudamericana.webp" },
  { name: "ReNacer", logo: "/images/logos/logo__renacer.webp" },
  { name: "Mendoza Gobierno", logo: "/images/logos/logo__mendoza_gobierno.webp" },
  { name: "Alliance Francaise", logo: "/images/logos/logo__alliance_francaise.webp" },
  { name: "Municipio de Maipu", logo: "/images/logos/logo__municipio_maipu.webp" },
  { name: "F.A.D.E.P.", logo: "/images/logos/logo__fadep.webp" },
  { name: "Tevelam", logo: "/images/logos/logo__tavelam.webp" },
  { name: "Lauquen Obras", logo: "/images/logos/logo__lauquen_obras.webp" },
  { name: "Liga Mendocina de Futbol", logo: "/images/logos/logo__liga_mendocina_futbol.webp" },
  { name: "Cliente Corporativo", logo: null },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 4000
          const increment = value / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-extralight text-gradient tabular-nums">
      {count}{suffix}
    </span>
  )
}

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isInView }
}

export function AboutSection() {
  const heroView = useInView()
  const statsView = useInView()
  const missionView = useInView()
  const ceoView = useInView()
  const qualityView = useInView()
  const clientsView = useInView()
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  return (
    <section id="nosotros" className="relative overflow-hidden">
      {/* Hero Intro Block */}
      <div ref={heroView.ref} className="relative min-h-screen flex items-center py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className={`transition-all duration-1000 ${heroView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs uppercase tracking-[0.2em]">Sobre Nosotros</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-8 leading-tight">
                Quiénes{" "}
                <span className="text-gradient font-normal">Somos</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Somos una empresa de seguridad comprometida en brindarle a nuestros clientes asesoramiento y soluciones inmediatas a la medida de sus necesidades.
                </p>
                <p>
                  Nuestro equipo está conformado por expertos con más de <span className="text-primary font-medium">30 años de experiencia</span> en diversas fuerzas policiales del país.
                </p>
                <p className="text-foreground/80">
                  Desde nuestros comienzos, hemos evolucionado y expandido nuestros servicios en un continuo proceso de especialización e innovación.
                </p>
              </div>

              {/* ISO Certifications in Quienes Somos */}
              <div className="mt-10 pt-10 border-t border-primary/10">
                <p className="text-xs text-primary uppercase tracking-[0.2em] mb-4">Certificaciones</p>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert) => (
                    <div 
                      key={cert.name}
                      className="group inline-flex items-center gap-2 px-4 py-3 border border-primary/20 rounded-xl text-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Award className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="text-foreground font-medium">{cert.name}</span>
                        <span className="text-muted-foreground text-xs block">{cert.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image / Visual element */}
            <div className={`transition-all duration-1000 delay-300 ${heroView.isInView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
              <div className="relative">
                {/* Main card */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary/50" />
                    </div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-primary/30 fill-primary/30" />
                      ))}
                    </div>
                  </div>

                  {/* Center content - Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Image 
                        src="/images/logos/logo__navkok.png" 
                        alt="Navkok Security Logo"
                        width={160}
                        height={160}
                        className="mx-auto mb-6 group-hover:scale-110 transition-transform duration-500"
                      />
                      <p className="text-primary/60 text-xs uppercase tracking-[0.2em] mb-2">Navkok Security Group</p>
                      <p className="text-foreground/40 text-sm leading-relaxed max-w-xs">
                        Excelencia en seguridad privada desde hace más de 30 años
                      </p>
                    </div>
                  </div>

                  {/* Bottom decoration */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent" />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/20 rounded-xl bg-secondary/50 backdrop-blur-sm flex items-center justify-center animate-float">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -bottom-6 -left-6 px-6 py-4 border border-primary/20 rounded-xl bg-secondary/50 backdrop-blur-sm animate-float" style={{ animationDelay: '0.5s' }}>
                  <p className="text-xs text-primary uppercase tracking-wider">Certificación ISO</p>
                  <p className="text-lg text-foreground font-light">9001 | 14001 | 45001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with enhanced effects */}
      <div ref={statsView.ref} className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative text-center p-8 rounded-2xl transition-all duration-700 cursor-pointer group",
                  statsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                  hoveredStat === index && "scale-105"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                {/* Background glow */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500",
                  hoveredStat === index && "opacity-100"
                )} />
                
                {/* Border */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl border transition-colors duration-500",
                  hoveredStat === index ? "border-primary/40" : "border-primary/10"
                )} />

                <div className="relative z-10">
                  <div className={cn(
                    "w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center transition-all duration-500",
                    hoveredStat === index ? "bg-primary scale-110" : "bg-primary/10"
                  )}>
                    <stat.icon className={cn(
                      "w-8 h-8 transition-colors",
                      hoveredStat === index ? "text-primary-foreground" : "text-primary"
                    )} />
                  </div>
                  
                  <div className="mb-6">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="h-px w-16 bg-primary/30 mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-1">{stat.label}</p>
                  <p className="text-muted-foreground text-sm">{stat.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision with cards */}
      <div ref={missionView.ref} className="py-32 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className={`transition-all duration-700 ${missionView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="group relative h-full p-8 lg:p-12 rounded-2xl border border-primary/10 bg-gradient-to-br from-secondary/30 to-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Target className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-light mb-6">
                  Nuestra <span className="text-gradient">Misión</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Asegurar la protección de nuestros clientes, priorizando la prevención para disuadir cualquier intento de alterar la tranquilidad y seguridad que les ofrecemos. Nos comprometemos a responder con prontitud, eficacia y profesionalismo ante cualquier amenaza.
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </div>
            </div>

            {/* Vision */}
            <div className={`transition-all duration-700 delay-200 ${missionView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="group relative h-full p-8 lg:p-12 rounded-2xl border border-primary/10 bg-gradient-to-br from-secondary/30 to-transparent hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Eye className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-light mb-6">
                  Nuestra <span className="text-gradient">Visión</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Posicionarnos como una de las principales compañías de seguridad a nivel nacional e internacional, destacándonos por nuestro profesionalismo y fiabilidad. Nuestro personal se distinguirá por su entrega, competencia, vigilancia, prevención, coraje, disciplina y honor.
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Section */}
      <div ref={ceoView.ref} className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${ceoView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid md:grid-cols-[280px_1fr] gap-12 items-center">
              {/* CEO Photo placeholder */}
              <div className="relative mx-auto md:mx-0 group">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/20 relative bg-gradient-to-br from-secondary/50 to-secondary/30 group-hover:border-primary/50 transition-colors duration-500">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <User className="w-20 h-20 text-primary/30 mb-2" />
                    <p className="text-primary/60 text-[10px] uppercase tracking-[0.15em]">Foto CEO</p>
                  </div>
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border border-primary/10 scale-110 group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute inset-0 rounded-full border border-primary/5 scale-125 group-hover:scale-150 transition-transform duration-700" />
              </div>

              {/* CEO Info */}
              <div className="text-center md:text-left">
                <span className="text-primary text-xs uppercase tracking-[0.2em] mb-4 block">Dirección General</span>
                <h3 className="text-3xl lg:text-4xl font-light mb-2">
                  <span className="text-gradient">[Nombre del CEO]</span>
                </h3>
                <p className="text-muted-foreground text-lg mb-6">Director General / Fundador</p>
                <p className="text-muted-foreground leading-relaxed">
                  Con más de tres décadas de experiencia en fuerzas de seguridad y gestión empresarial, lidera Navkok Security Group con una visión clara: brindar servicios de seguridad de élite que superen las expectativas del mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Policy */}
      <div ref={qualityView.ref} className="py-32 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className={`transition-all duration-700 ${qualityView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-primary text-xs uppercase tracking-[0.2em] mb-4 block">Excelencia</span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-6">
                Política de <span className="text-gradient">Calidad</span>
              </h3>
            </div>
          </div>

          {/* ISO Certifications in Quality Policy */}
          <div className={cn(
            "flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700",
            qualityView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            {certifications.map((cert) => (
              <div 
                key={cert.name}
                className="group inline-flex items-center gap-3 px-6 py-4 border border-primary/20 rounded-xl bg-secondary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <Award className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-foreground font-medium block">{cert.name}</span>
                  <span className="text-muted-foreground text-xs">{cert.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {qualityActions.map((action, index) => (
              <div 
                key={index} 
                className={cn(
                  "group relative p-8 rounded-2xl border border-primary/10 bg-secondary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden",
                  qualityView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl animate-pulse-slow bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
                </div>
                
                <span className="text-6xl font-extralight text-primary/20 group-hover:text-primary/50 transition-all duration-500 absolute top-4 right-4 group-hover:scale-110">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10 pt-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <CheckCircle className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors">{action}</p>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div ref={clientsView.ref} className="py-32 relative border-t border-primary/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className={`transition-all duration-700 ${clientsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-primary text-xs uppercase tracking-[0.2em] mb-4 block">Confianza</span>
              <h3 className="text-3xl md:text-4xl font-extralight">
                Clientes que <span className="text-gradient">confían</span> en nosotros
              </h3>
            </div>
          </div>

          <div className={cn(
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 transition-all duration-1000",
            clientsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            {clients.map((client, index) => (
              <div 
                key={index}
                className="group aspect-square flex flex-col items-center justify-center p-6 border border-primary/10 rounded-2xl bg-secondary/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default hover:scale-105 hover:shadow-xl hover:shadow-primary/5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Client Logo */}
                <div className="w-24 h-24 mb-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 overflow-hidden">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={70}
                      height={70}
                      className="object-contain w-[70px] h-[70px] group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-primary/40 text-lg font-bold group-hover:text-primary/60 transition-colors">{client.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground text-center leading-tight group-hover:text-foreground transition-colors font-medium">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
