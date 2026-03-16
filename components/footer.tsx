"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, Mail, Globe, MapPin, Phone, Shield, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const locations = [
  { city: "CABA", address: "11 de Septiembre de 1888 N4717" },
  { city: "Mendoza", address: "Montevideo N747 (PB B)" },
  { city: "Neuquén", address: "Chos Malal N89, Plottier" },
  { city: "Río Negro", address: "Estados Unidos N546, Gral. Roca" },
]

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#consulta" },
]

const certifications = ["ISO 9001:2015", "ISO 14001", "ISO 45001"]

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <footer className="relative bg-secondary/20 border-t border-primary/10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo & Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="#inicio" className="inline-flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/images/logos/logo__navkok.png"
                  alt="Navkok Logo"
                  width={72}
                  height={72}
                  className="relative w-16 h-auto group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-gradient font-semibold text-xl tracking-[0.1em] block">NAVKOK</span>
                <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Security Group SRL</span>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Más de 30 años protegiendo personas, bienes e instalaciones.
            </p>
            
            <div className="space-y-3">
              <a
                href="mailto:navkokoperaciones@gmail.com"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                navkokoperaciones@gmail.com
              </a>
              <a
                href="tel:+5402616600507"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                0261 660-0507
              </a>
              <a
                href="https://navkoksecuritygroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Globe className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                navkoksecuritygroup.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Navegación
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center gap-2 p-2 rounded-lg group",
                      hoveredLink === link.href && "text-primary bg-primary/5"
                    )}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-all duration-300",
                      hoveredLink === link.href ? "translate-x-1 text-primary" : "text-primary/50"
                    )} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Oficinas
            </h4>
            <ul className="space-y-4">
              {locations.map((location) => (
                <li key={location.city} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-3 h-3 text-primary/70" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{location.city}</span>
                    <p className="text-xs text-muted-foreground">{location.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certificaciones
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {certifications.map((cert) => (
                <div 
                  key={cert} 
                  className="group inline-flex items-center gap-2 px-4 py-3 border border-primary/20 rounded-xl text-xs text-muted-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default"
                >
                  <Award className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  {cert}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-primary/60 uppercase tracking-wider">Global Bureau Certificación</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Navkok Security Group SRL. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
