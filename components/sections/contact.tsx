"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Clock, Phone, ArrowRight, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

const locations = [
  {
    city: "CABA",
    region: "Buenos Aires",
    address: "11 de Septiembre de 1888 N4717 (piso 5, dpto A)",
    hours: "Lun-Vie 9 a 17 hs",
    phone: "(011) 4519-0774",
    mapQuery: "11+de+Septiembre+de+1888+4717,+Buenos+Aires,+Argentina",
  },
  {
    city: "Mendoza",
    region: "Cuyo",
    address: "Av. Emilio Civit 138, Mendoza",
    hours: "Lun-Vie 9 a 17 hs",
    phone: "0261 660-0507",
    mapQuery: "Avenida+Emilio+Civit+138,+Mendoza,+Argentina",
  },
  {
    city: "Neuquén",
    region: "Patagonia Norte",
    address: "Chos Malal N89 (piso 1, oficina 1), Plottier",
    hours: "Lun-Vie 9 a 17 hs",
    phone: null,
    mapQuery: "Chos+Malal+89,+Plottier,+Neuquen,+Argentina",
  },
  {
    city: "Río Negro",
    region: "Patagonia Norte",
    address: "Estados Unidos N546 (local 1), Gral. Roca",
    hours: "Lun-Vie 9 a 17 hs",
    phone: null,
    mapQuery: "Estados+Unidos+546,+General+Roca,+Rio+Negro,+Argentina",
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

export function ContactSection() {
  const [activeLocation, setActiveLocation] = useState(0)
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null)
  const headerView = useInView()
  const contentView = useInView()

  return (
    <section id="contacto" className="py-20 md:py-24 xl:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerView.ref}
          className={`text-center mb-20 transition-all duration-1000 ${headerView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Navigation className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs uppercase tracking-[0.2em]">Encuéntranos</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extralight mb-6">
            Nuestras <span className="text-gradient font-normal">Oficinas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            Presencia estratégica en las principales ciudades del país
          </p>
        </div>

        <div 
          ref={contentView.ref}
          className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-1000 ${contentView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Locations List */}
          <div className="lg:col-span-2 space-y-4">
            {locations.map((location, index) => (
              <button
                key={index}
                className={cn(
                  "w-full text-left p-6 rounded-xl border transition-all duration-500 group relative overflow-hidden",
                  activeLocation === index
                    ? "bg-primary/10 border-primary/40 scale-[1.02]"
                    : "bg-secondary/20 border-primary/10 hover:border-primary/30 hover:bg-secondary/30"
                )}
                onClick={() => setActiveLocation(index)}
                onMouseEnter={() => setHoveredLocation(index)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Animated background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-500",
                  (hoveredLocation === index || activeLocation === index) && "opacity-100"
                )} />
                
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                        activeLocation === index ? "bg-primary scale-110" : "bg-primary/10"
                      )}>
                        <MapPin className={cn(
                          "w-5 h-5 transition-colors",
                          activeLocation === index ? "text-primary-foreground" : "text-primary"
                        )} />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-foreground">
                          {location.city}
                        </h3>
                        <p className="text-xs text-primary/60 uppercase tracking-wider">
                          {location.region}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 pl-13">
                      {location.address}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pl-13">
                      <a
                        href="tel:08002206574"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-3 h-3 text-primary/50" />
                        0800 220 6574
                      </a>
                    </div>
                  </div>
                  
                  <ArrowRight className={cn(
                    "w-5 h-5 transition-all duration-300 mt-2",
                    activeLocation === index 
                      ? "text-primary translate-x-0 opacity-100" 
                      : "text-primary/30 -translate-x-2 opacity-0 group-hover:opacity-50 group-hover:translate-x-0"
                  )} />
                </div>

                {/* Active indicator line */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full transition-all duration-500",
                  activeLocation === index ? "opacity-100" : "opacity-0"
                )} />
              </button>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-3 h-[500px] lg:h-auto min-h-[500px] rounded-2xl overflow-hidden border border-primary/20 relative group">
            {/* Map header overlay */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/90 via-background/50 to-transparent z-10 p-6 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-primary uppercase tracking-wider font-medium">
                    {locations[activeLocation].city}
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
            </div>
            
            <iframe
              src={`https://www.google.com/maps?q=${locations[activeLocation].mapQuery}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${locations[activeLocation].city}`}
              className="w-full h-full"
            />
            
            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-lg pointer-events-none" />
            
            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/50 to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
