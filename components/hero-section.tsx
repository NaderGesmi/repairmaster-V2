"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  const { t, dir } = useLanguage()

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" dir={dir}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t("hero.subtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                href="#pricing"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {t("hero.cta")}
              </a>
              <a
                href="https://wa.me/+40741318528"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {t("hero.secondaryCta")}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://res.cloudinary.com/katakuri740/image/upload/v1748195230/dkbpw2byabqk306ckpeb.jpg"
                alt={t("hero.imageAlt")}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
