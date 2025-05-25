"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Shield, Clock, CheckCircle, Award } from "lucide-react"

export function TrustSignals() {
  const { t, dir } = useLanguage()

  const trustItems = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: t("trust.warranty.title"),
      description: t("trust.warranty.description"),
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: t("trust.sameDay.title"),
      description: t("trust.sameDay.description"),
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t("trust.certified.title"),
      description: t("trust.certified.description"),
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: t("trust.guarantee.title"),
      description: t("trust.guarantee.description"),
    },
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
            {t("trust.title")}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("trust.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 