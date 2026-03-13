"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, ArrowRight, Image as ImageIcon, Shield, User, Building, Phone, Mail, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

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

const formFields = [
  { id: 'nombre', label: 'Nombre', icon: User, placeholder: 'Tu nombre completo', type: 'text', required: true },
  { id: 'empresa', label: 'Empresa', icon: Building, placeholder: 'Nombre de tu empresa', type: 'text', required: false },
  { id: 'telefono', label: 'Telefono', icon: Phone, placeholder: '+54 11 1234-5678', type: 'tel', required: true },
  { id: 'email', label: 'Email', icon: Mail, placeholder: 'tu@email.com', type: 'email', required: true },
]

export function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set())
  const [currentStep, setCurrentStep] = useState(0)
  const headerView = useInView()
  const formView = useInView()

  const handleFieldChange = (fieldId: string, value: string) => {
    if (value.trim()) {
      setFilledFields(prev => new Set(prev).add(fieldId))
    } else {
      setFilledFields(prev => {
        const newSet = new Set(prev)
        newSet.delete(fieldId)
        return newSet
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  const progressPercentage = (filledFields.size / 5) * 100

  return (
    <section id="consulta" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerView.ref}
          className={`text-center mb-16 transition-all duration-1000 ${headerView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs uppercase tracking-[0.2em]">Contacto</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-6 leading-tight">
            Solicita tu{" "}
            <span className="text-gradient font-normal">Consulta</span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Completa el formulario y un asesor especializado se pondra en contacto para brindarte una solucion personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          {/* Left side - Form (primary, much larger) */}
          <div ref={formView.ref} className={`lg:col-span-2 transition-all duration-1000 ${formView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative p-8 lg:p-12 border border-primary/10 rounded-3xl bg-secondary/10 backdrop-blur-sm overflow-hidden">
              {/* Animated progress bar at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary/10">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Floating corner accents with animation */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl transition-all duration-300" style={{ borderColor: focusedField ? 'rgba(212, 175, 55, 0.5)' : undefined }} />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl transition-all duration-300" style={{ borderColor: focusedField ? 'rgba(212, 175, 55, 0.5)' : undefined }} />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-3xl transition-all duration-300" style={{ borderColor: focusedField ? 'rgba(212, 175, 55, 0.5)' : undefined }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-3xl transition-all duration-300" style={{ borderColor: focusedField ? 'rgba(212, 175, 55, 0.5)' : undefined }} />

              {/* Glow effect when field is focused */}
              <div className={cn(
                "absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500",
                focusedField ? "opacity-100" : "opacity-0"
              )} />

              {isSubmitted ? (
                <div className="text-center py-20 relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-8 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-3xl font-light text-foreground mb-4">
                    Mensaje <span className="text-gradient">Enviado</span>
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {/* Progress indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Progreso del formulario</span>
                    <span className="text-xs text-primary font-medium">{filledFields.size}/5 campos</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {formFields.map((field, index) => (
                      <div 
                        key={field.id}
                        className={cn(
                          "space-y-3 transition-all duration-500",
                          formView.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <label 
                          htmlFor={field.id} 
                          className={cn(
                            "flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all duration-300",
                            focusedField === field.id ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          <field.icon className={cn(
                            "w-4 h-4 transition-all duration-300",
                            focusedField === field.id ? "text-primary scale-110" : "text-muted-foreground"
                          )} />
                          {field.label}
                          {filledFields.has(field.id) && (
                            <CheckCircle className="w-3 h-3 text-primary ml-auto animate-scale-in" />
                          )}
                        </label>
                        <div className="relative">
                          <Input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            onFocus={() => setFocusedField(field.id)}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className={cn(
                              "bg-transparent border-primary/20 rounded-xl h-14 placeholder:text-muted-foreground/40 transition-all duration-300",
                              focusedField === field.id && "border-primary shadow-lg shadow-primary/10 bg-primary/5",
                              filledFields.has(field.id) && "border-primary/40"
                            )}
                          />
                          {/* Input underline animation */}
                          <div className={cn(
                            "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 rounded-full",
                            focusedField === field.id ? "w-full" : "w-0"
                          )} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div 
                    className={cn(
                      "space-y-3 transition-all duration-500",
                      formView.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: '400ms' }}
                  >
                    <label 
                      htmlFor="mensaje" 
                      className={cn(
                        "flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all duration-300",
                        focusedField === 'mensaje' ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <MessageSquare className={cn(
                        "w-4 h-4 transition-all duration-300",
                        focusedField === 'mensaje' ? "text-primary scale-110" : "text-muted-foreground"
                      )} />
                      Mensaje
                      {filledFields.has('mensaje') && (
                        <CheckCircle className="w-3 h-3 text-primary ml-auto animate-scale-in" />
                      )}
                    </label>
                    <div className="relative">
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        placeholder="Contanos sobre tus necesidades de seguridad..."
                        rows={5}
                        required
                        onFocus={() => setFocusedField('mensaje')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => handleFieldChange('mensaje', e.target.value)}
                        className={cn(
                          "bg-transparent border-primary/20 rounded-xl resize-none placeholder:text-muted-foreground/40 transition-all duration-300",
                          focusedField === 'mensaje' && "border-primary shadow-lg shadow-primary/10 bg-primary/5",
                          filledFields.has('mensaje') && "border-primary/40"
                        )}
                      />
                      <div className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 rounded-full",
                        focusedField === 'mensaje' ? "w-full" : "w-0"
                      )} />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className={cn(
                      "w-full bg-primary text-primary-foreground hover:bg-primary/90 h-16 text-sm uppercase tracking-wider rounded-xl group transition-all duration-500 relative overflow-hidden",
                      filledFields.size === 5 && "animate-pulse-slow"
                    )}
                    disabled={isSubmitting}
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {isSubmitting ? (
                      <span className="flex items-center gap-3 relative z-10">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3 relative z-10">
                        Enviar Consulta
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right side - Image placeholder (secondary, smaller) */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${formView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-primary/10 bg-secondary/30 relative group sticky top-32">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <ImageIcon className="w-12 h-12 text-primary/20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-primary/60 text-xs uppercase tracking-[0.15em] mb-2">Imagen</p>
                  <p className="text-foreground/40 text-xs leading-relaxed max-w-[180px]">
                    Asesor de seguridad en reunion profesional
                  </p>
                </div>
              </div>
              
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-primary/20 rounded-tl-lg group-hover:border-primary/40 transition-colors" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-primary/20 rounded-br-lg group-hover:border-primary/40 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
