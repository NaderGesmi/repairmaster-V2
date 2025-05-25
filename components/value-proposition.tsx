"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { CheckCircle2, Clock, Shield, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

export function ValueProposition() {
  const { t, dir } = useLanguage()

  const valueItems = [
    {
      icon: CheckCircle2,
      title: t("value.quality.title") || "Quality Guaranteed",
      description: t("value.quality.description") || "We use only high-quality parts and provide a 6-month warranty on all repairs"
    },
    {
      icon: Clock,
      title: t("value.speed.title") || "Fast Service",
      description: t("value.speed.description") || "Same-day service available for urgent repairs. We value your time"
    },
    {
      icon: Shield,
      title: t("value.trust.title") || "Trusted Experts",
      description: t("value.trust.description") || "Certified technicians with years of experience in electronics repair"
    },
    {
      icon: Wrench,
      title: t("value.transparency.title") || "Transparent Pricing",
      description: t("value.transparency.description") || "No hidden fees. Get a clear quote before we start any work"
    }
  ]

  // Add error handling for undefined icons
  const renderIcon = (Icon: any) => {
    if (!Icon) {
      console.error("Icon component is undefined")
      return null
    }
    return <Icon className="h-6 w-6 text-primary" />
  }

  return (
    <section className="py-16 bg-background" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("value.title") || "Why Choose Us"}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("value.subtitle") || "We combine professional expertise with customer-focused service"}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {valueItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10">
                {renderIcon(item.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            {t("value.cta") || "Get a Free Quote"}
          </a>
        </motion.div>
      </div>
    </section>
  )
} 