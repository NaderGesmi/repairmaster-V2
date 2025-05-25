import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { SocialProof } from "@/components/social-proof"
import { TrustSignals } from "@/components/trust-signals"
import { FAQSection } from "@/components/faq-section"
import { ValueProposition } from "@/components/value-proposition"
import { MobileOptimizations } from "@/components/mobile-optimizations"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustSignals />
      <FAQSection />
      <ServicesSection />
      <ValueProposition />
      <MobileOptimizations />
      <GallerySection />
      <SocialProof />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
    </main>
  )
}
