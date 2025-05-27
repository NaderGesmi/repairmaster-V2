"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wind, Thermometer, Wrench, Tv, ArrowRight } from "lucide-react"

export function ServicesSection() {
  const { t, dir } = useLanguage()

  const services = [
    {
      icon: Wind,
      title: t("services.acCleaning.title") || "AC Cleaning",
      description: t("services.acCleaning.description") || "Professional cleaning and complete sanitization for air conditioning units.",
      price: "150 RON",
      value: "ac-cleaning"
    },
    {
      icon: Thermometer,
      title: t("services.acInstallation.title") || "AC Installation",
      description: t("services.acInstallation.description") || "Professional installation of air conditioning units.",
      price: "200 RON",
      value: "ac-installation"
    },
    {
      icon: Wrench,
      title: t("services.freon.title") || "Freon Check",
      description: t("services.freon.description") || "Testing and refilling with freon for optimal performance.",
      price: "100 RON",
      value: "freon-check"
    },
    {
      icon: Tv,
      title: t("services.diagnostics.title") || "Diagnostics",
      description: t("services.diagnostics.description") || "In-depth diagnostics for identifying and resolving issues.",
      price: "80 RON",
      value: "diagnostics"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const scrollToContact = (serviceValue: string) => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      // Set the service in the form
      const serviceSelect = document.getElementById('service') as HTMLSelectElement
      if (serviceSelect) {
        serviceSelect.value = serviceValue
        // Trigger change event
        const event = new Event('change', { bubbles: true })
        serviceSelect.dispatchEvent(event)
      }
      
      // Scroll to contact section
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {t("services.title") || "Services & Pricing"}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("services.subtitle") || "Professional repair services at competitive prices"}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative bg-card rounded-lg border p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="p-2 rounded-full bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                <div className="space-y-4">
                  <p className="text-2xl font-bold text-primary">{service.price}</p>
                  <Button 
                    onClick={() => scrollToContact(service.value)}
                    className="w-full group-hover:bg-primary/90 transition-colors"
                  >
                    {t("services.bookNow") || "Book Now"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
