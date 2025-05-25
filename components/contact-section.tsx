"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { BookingForm } from "@/components/booking-form"
import { Tv, Wind, Thermometer, Wrench, Phone, MessageSquare, Mail } from "lucide-react"

export function ContactSection() {
  const { t, dir } = useLanguage()

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted to-background" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("contact.title") || "Contact & Booking"}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("contact.subtitle") || "Get in touch with us for professional repair services. We're here to help!"}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t("contact.ourServices") || "Our Professional Services"}</h3>
              <div className="grid gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Tv className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.tv.title") || "TV Repairs"}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Wind className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.acCleaning.title") || "AC Cleaning"}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Thermometer className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.acInstallation.title") || "AC Installation"}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.freon.title") || "Freon Check"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{t("contact.orContactDirectly") || "Or contact us directly"}</h3>
              <div className="space-y-4">
                <a
                  href="tel:+40741318528"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">+40 741 318 528</span>
                </a>
                <a
                  href="https://wa.me/40741318528"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </a>
                <a
                  href="mailto:contact@repairmaster.ro"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">contact@repairmaster.ro</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card p-6 rounded-lg border shadow-lg"
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
