"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Smartphone, Wifi, Battery, Zap } from "lucide-react"

export function MobileOptimizations() {
  const { t, dir } = useLanguage()

  const mobileFeatures = [
    {
      icon: Smartphone,
      title: t("mobile.responsive.title") || "Fully Responsive",
      description: t("mobile.responsive.description") || "Perfect experience on any device, from mobile to desktop"
    },
    {
      icon: Wifi,
      title: t("mobile.performance.title") || "Fast Loading",
      description: t("mobile.performance.description") || "Optimized for quick loading even on mobile networks"
    },
    {
      icon: Battery,
      title: t("mobile.battery.title") || "Battery Efficient",
      description: t("mobile.battery.description") || "Optimized to minimize battery usage on mobile devices"
    },
    {
      icon: Zap,
      title: t("mobile.touch.title") || "Touch Friendly",
      description: t("mobile.touch.description") || "Large touch targets and smooth interactions for mobile users"
    }
  ]

  return (
    <section className="py-16 bg-muted/50" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("mobile.title") || "Mobile Optimized"}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("mobile.subtitle") || "Experience our services seamlessly on any device"}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {mobileFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 