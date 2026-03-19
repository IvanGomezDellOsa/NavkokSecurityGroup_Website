import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ServicesSection } from "@/components/sections/services"
import { ContactFormSection } from "@/components/sections/contact-form"
import { WorkWithUsSection } from "@/components/sections/work-with-us"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactFormSection />
        <WorkWithUsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
