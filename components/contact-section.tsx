"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import BookingForm from "./booking-form"
import { Tv, Wind, Thermometer, Wrench, Phone, MessageSquare, Mail, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  const { t, dir } = useLanguage()

  const services = [
    { icon: Tv, title: t("services.tv.title") || "TV Repairs" },
    { icon: Wind, title: t("services.acCleaning.title") || "AC Cleaning" },
    { icon: Thermometer, title: t("services.acInstallation.title") || "AC Installation" },
    { icon: Wrench, title: t("services.freon.title") || "Freon Check" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {t("contact.title") || "Contact & Booking"}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("contact.subtitle") || "Get in touch with us for professional repair services. We're here to help!"}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold"
              >
                {t("contact.ourServices") || "Our Professional Services"}
              </motion.h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    variants={itemVariants}
                    className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                  >
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{service.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold"
              >
                {t("contact.orContactDirectly") || "Or contact us directly"}
              </motion.h3>
              <div className="grid gap-4">
                <motion.a
                  variants={itemVariants}
                  href="tel:+40741318528"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">+40 741 318 528</span>
                </motion.a>

                <motion.a
                  variants={itemVariants}
                  href="https://wa.me/40741318528"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </motion.a>

                <motion.a
                  variants={itemVariants}
                  href="mailto:contact@repairmaster.ro"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">contact@repairmaster.ro</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card p-6 rounded-lg border shadow-lg hover:shadow-xl transition-shadow"
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
