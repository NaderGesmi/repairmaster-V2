"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  const { t, dir } = useLanguage()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background to-muted" dir={dir}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
            <motion.h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" variants={item}>
              {t("hero.title")}
            </motion.h1>
            <motion.p className="max-w-[600px] text-muted-foreground md:text-xl" variants={item}>
              {t("hero.subtitle")}
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3 pt-4" variants={item}>
              <Button asChild size="lg" className="font-medium">
                <Link href="#contact">{t("hero.cta")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-medium">
                <a href="https://wa.me/40741318528">WhatsApp</a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ac-install.jpg-1xG3XS2via4d8r81AZFhk9HLaAfm3B.jpeg"
                alt={t("hero.imageAlt")}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
