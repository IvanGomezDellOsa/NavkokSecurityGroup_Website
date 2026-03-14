"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Camera, 
  Video, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  Mountain,
  UserCheck,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Camera,
    title: "Cámaras y Alarmas",
    shortTitle: "Monitoreo",
    description: "Contamos con un equipo de monitoreo las 24 horas para hogares, comercios y empresas, adaptado a las necesidades específicas de cada cliente. Si se detecta movimiento o una amenaza, la alarma se activa de forma inmediata y envía una señal a nuestra central de monitoreo. Controlá tu propiedad desde cualquier lugar y dispositivo con un simple clic.",
    features: ["Monitoreo 24/7", "Detectores de exterior", "Alertas en tiempo real", "Control remoto", "Hogares y empresas"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Video,
    title: "Video Vigilancia Móvil",
    shortTitle: "CCTV",
    description: "Diseñamos, implementamos y gestionamos sistemas de videovigilancia a medida para hogares, comercios e instalaciones de mayor escala. Nuestro equipo técnico especializado se encarga de todo el proceso, desde la planificación hasta la puesta en marcha y el monitoreo continuo, garantizando cobertura total del espacio a proteger.",
    features: ["Instalación a medida", "Gestión técnica", "Cobertura total", "Comercios e industrias"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Zap,
    title: "Cercos Eléctricos",
    shortTitle: "Perímetro",
    description: "Instalamos sistemas de protección perimetral con cercos eléctricos para hogares, comercios e instalaciones industriales. Cada proyecto incluye instalación profesional, mantenimiento preventivo y respuesta ante cualquier incidencia, cumpliendo con todas las normativas de seguridad vigentes.",
    features: ["Protección perimetral", "Instalación profesional", "Mantenimiento preventivo", "Normativas vigentes"],
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Vigilancia Física",
    shortTitle: "Guardias",
    description: "Brindamos soluciones de protección física y dinámica a medida de cada cliente, con personal altamente capacitado y calificado. Cubrimos seguridad en consorcios, comercios, empresas e instituciones, incluyendo control de accesos, tránsito de mercadería y valores, y custodia de instalaciones.",
    features: ["Control de accesos", "Tránsito de valores", "Custodia de instalaciones", "Personal certificado", "Empresas e instituciones"],
    gradient: "from-primary/20 to-yellow-500/20",
  },
  {
    icon: Trophy,
    title: "Seguridad Deportiva",
    shortTitle: "Deportes",
    description: "Líderes en seguridad deportiva desde hace más de 20 años, con presencia ininterrumpida en eventos de alto perfil y contacto permanente con autoridades policiales y deportivas. Custodiamos delegaciones argentinas y extranjeras, controlamos accesos y coordinamos con las fuerzas de seguridad para garantizar el normal desarrollo de cada evento.",
    features: ["+20 años de experiencia", "Custodia de delegaciones", "Control de accesos", "Coordinación con autoridades", "Eventos de alto perfil"],
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Mountain,
    title: "Cobertura en Locaciones Alejadas",
    shortTitle: "Remoto",
    description: "Servicio especializado en entornos remotos: zonas mineras, petroleras y locaciones alejadas de los centros urbanos. Operamos con infraestructura propia que incluye conectividad satelital Starlink, flota vehicular con antigüedad máxima de 2 años, unidades de vigilancia móvil equipadas y logística integral de traslado de personal con habilitaciones especiales para el ingreso a bases operativas y yacimientos.",
    features: ["Conectividad Starlink", "Flota vehicular propia", "Logística integral", "Zonas mineras y petroleras", "Habilitaciones para yacimientos"],
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    icon: UserCheck,
    title: "Protección Ejecutiva",
    shortTitle: "VIP",
    description: "Brindamos servicios de protección personal a directivos, ejecutivos y figuras de alto perfil, con esquemas de seguridad adaptados a las necesidades específicas de cada cliente. Nuestro personal está capacitado en técnicas de escolta, evaluación de riesgos y planificación de desplazamientos, garantizando seguridad en todo momento y entorno. Discreción, profesionalismo y respuesta inmediata son los pilares de este servicio.",
    features: ["Escolta profesional", "Evaluación de riesgos", "Planificación de desplazamientos", "Discreción total", "Esquemas a medida"],
    gradient: "from-primary/20 to-amber-500/20",
  },
]

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

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const headerView = useInView()
  const gridView = useInView()

  return (
    <section id="servicios" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerView.ref}
          className={`text-center mb-20 transition-all duration-1000 ${headerView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs uppercase tracking-[0.2em]">Nuestros Servicios</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight mb-8 leading-tight">
            Nuestros <span className="text-gradient font-normal">Servicios</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            Ofrecemos soluciones integrales de seguridad adaptadas a las necesidades específicas de cada cliente, desde entornos urbanos y corporativos hasta locaciones industriales, mineras y petroleras de alta exigencia. Tecnología de última generación y personal certificado al servicio de cada operación.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={gridView.ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "group relative transition-all duration-700 cursor-default",
                gridView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={cn(
                "relative h-full border border-primary/10 rounded-lg overflow-hidden transition-all duration-500 flex flex-col",
                "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10",
                hoveredCard === index && "scale-[1.01]"
              )}>
                {/* Gradient background on hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                  service.gradient,
                  hoveredCard === index && "opacity-100"
                )} />
                
                {/* Glass effect */}
                <div className="absolute inset-0 backdrop-blur-sm bg-secondary/30" />
                
                {/* Content */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                  {/* Header with Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    {/* Icon with animated ring */}
                    <div className="relative shrink-0">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500",
                        hoveredCard === index 
                          ? "bg-primary text-primary-foreground scale-110" 
                          : "bg-primary/10 text-primary"
                      )}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      {/* Animated ring */}
                      <div className={cn(
                        "absolute inset-0 rounded-xl border-2 border-primary/50 scale-100 opacity-0 transition-all duration-500",
                        hoveredCard === index && "scale-150 opacity-100"
                      )} />
                    </div>

                    {/* Title */}
                    <div>
                      <span className="text-[10px] text-primary/60 uppercase tracking-[0.2em] mb-1 block">
                        {service.shortTitle}
                      </span>
                      <h3 className="text-xl md:text-2xl font-light text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className={cn(
                          "text-[10px] px-3 py-1.5 rounded-full border transition-all duration-300",
                          hoveredCard === index 
                            ? "border-primary/40 bg-primary/10 text-primary" 
                            : "border-primary/20 text-primary/70"
                        )}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={cn(
                  "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-yellow-400 to-primary transition-all duration-500",
                  hoveredCard === index ? "w-full" : "w-0"
                )} />

                {/* Corner decoration */}
                <div className={cn(
                  "absolute top-4 right-4 w-8 h-8 border-r border-t border-primary/20 transition-all duration-500",
                  hoveredCard === index && "scale-150 border-primary/50"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
