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
    title: "Camaras y alarmas",
    shortTitle: "Monitoreo",
    description: "Cada hogar tiene diferentes necesidades ante las amenazas y robos, por eso contamos con un equipo de monitoreo las 24 hs desde cualquier lugar en donde te encuentres. Nuestros sistemas incluyen detectores de movimiento de exterior, sensores perimetrales, control de acceso remoto via aplicacion movil, alertas en tiempo real y grabacion continua en la nube. Realizamos mantenimiento preventivo y asistencia tecnica permanente.",
    features: ["Monitoreo 24/7", "Detectores de exterior", "Control remoto", "Grabacion en nube", "Alertas en tiempo real"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Video,
    title: "Video vigilancia movil",
    shortTitle: "CCTV",
    description: "Un equipo de tecnologia capacitado para proyectar, implementar, gestionar y monitorear sistemas de seguridad por camaras a la medida de su casa o empresa. Ofrecemos camaras HD y 4K, vision nocturna avanzada, deteccion inteligente de movimiento con IA, integracion con sistemas de alarma existentes, acceso remoto multiplataforma y almacenamiento seguro con redundancia.",
    features: ["Implementacion personalizada", "Gestion integral", "Monitoreo continuo", "Camaras HD/4K", "Vision nocturna", "IA integrada"],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Zap,
    title: "Cercos electricos",
    shortTitle: "Perimetro",
    description: "Sistema de proteccion perimetral con cercos electricos de alta tecnologia. Instalacion profesional con garantia, mantenimiento preventivo y respuesta inmediata ante cualquier incidencia. Nuestros cercos cumplen con todas las normativas de seguridad vigentes, incluyen sistemas de respaldo de energia, integracion con alarmas sonoras y visuales, y monitoreo remoto del estado del sistema.",
    features: ["Proteccion perimetral", "Alta tecnologia", "Mantenimiento preventivo", "Normativas vigentes", "Respaldo de energia", "Alarmas integradas"],
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Vigilancia fisica",
    shortTitle: "Guardias",
    description: "Somos una empresa con servicios a medida de cada cliente, contamos con personal altamente capacitado y calificado. Brindamos soluciones de proteccion fisica y dinamica incluyendo control de mercaderias, control de ingreso y egreso, seguridad en transito, rondas de vigilancia programadas, custodia de bienes y valores, y proteccion de instalaciones criticas.",
    features: ["Control de mercaderias", "Control de ingreso y egreso", "Seguridad en transito", "Rondas programadas", "Custodia de valores", "Personal capacitado"],
    gradient: "from-primary/20 to-yellow-500/20",
  },
  {
    icon: Trophy,
    title: "Seguridad deportiva",
    shortTitle: "Deportes",
    description: "En este rubro somos lideres en la funcion desde hace 20 anos. En contacto permanente con autoridades policiales y deportivas de diferentes paises e instituciones. Brindamos seguridad en estadios, eventos deportivos masivos, custodia de delegaciones, control de accesos y acreditaciones, coordinacion con fuerzas de seguridad, y gestion de emergencias en eventos.",
    features: ["20 anos de experiencia", "Contacto con autoridades", "Cobertura internacional", "Eventos masivos", "Custodia de delegaciones", "Gestion de emergencias"],
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: Mountain,
    title: "Cobertura en locaciones alejadas",
    shortTitle: "Remoto",
    description: "Servicio especializado en entornos remotos: zonas mineras, petroleras, rutas y locaciones alejadas. Operamos con infraestructura propia incluyendo conectividad Starlink, flota vehicular equipada, generadores autonomos, sistemas de comunicacion satelital, personal capacitado para condiciones extremas, y logistica integral para operaciones en lugares de dificil acceso.",
    features: ["Conectividad Starlink", "Flota vehicular propia", "Logistica integral", "Zonas mineras y petroleras", "Comunicacion satelital", "Condiciones extremas"],
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    icon: UserCheck,
    title: "Proteccion ejecutiva",
    shortTitle: "VIP",
    description: "Brindamos servicios de proteccion personal a directivos, ejecutivos y figuras de alto perfil. Nuestro personal esta altamente capacitado en tecnicas de escolta, evaluacion de riesgos, conduccion evasiva y primeros auxilios avanzados. Ofrecemos planificacion de desplazamientos seguros, analisis de amenazas, coordinacion con autoridades, discrecion absoluta y disponibilidad 24/7.",
    features: ["Discrecion total", "Evaluacion de riesgos", "Planificacion de desplazamientos", "Conduccion evasiva", "Primeros auxilios", "Disponibilidad 24/7"],
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
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight mb-6">
            <span className="text-gradient font-normal">Servicios</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            Proteccion adaptada a las necesidades especificas de cada cliente
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
