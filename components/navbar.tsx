"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#consulta", label: "Contacto" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Detect active section
      const sections = navLinks.map(link => link.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-primary/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#inicio" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div className={cn(
                "absolute inset-0 bg-primary/20 rounded-full blur-xl transition-opacity duration-300",
                isScrolled ? "opacity-0" : "opacity-100"
              )} />
              <Image
                src="/images/logos/logo__navkok.png"
                alt="Navkok Logo"
                width={52}
                height={52}
                className={cn(
                  "relative transition-all duration-300 group-hover:scale-110",
                  isScrolled ? "w-10 h-auto" : "w-12 h-auto"
                )}
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-gradient font-semibold text-base tracking-[0.1em] block">NAVKOK</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Security Group SRL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-secondary/30 backdrop-blur-sm border border-primary/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-2.5 text-sm transition-all duration-300 rounded-full",
                    isActive 
                      ? "text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-primary rounded-full animate-fade-in" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link 
              href="#consulta" 
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            >
              <Shield className="w-4 h-4" />
              <span>Contactar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-12 h-12 flex items-center justify-center text-foreground rounded-full bg-secondary/50 border border-primary/10"
            aria-label="Toggle menu"
          >
            <span className={cn(
              "absolute w-5 h-px bg-current transition-all duration-300",
              isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
            )} />
            <span className={cn(
              "absolute w-5 h-px bg-current transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )} />
            <span className={cn(
              "absolute w-5 h-px bg-current transition-all duration-300",
              isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
            )} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500 ease-out",
            isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-6 pb-4">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-light transition-all duration-300 py-4 px-4 rounded-xl",
                    isActive 
                      ? "text-primary bg-primary/10 border border-primary/20" 
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link 
              href="#consulta" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 mt-4 px-6 py-4 bg-primary text-primary-foreground text-sm tracking-wide rounded-xl"
            >
              <Shield className="w-4 h-4" />
              <span>Contactar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
