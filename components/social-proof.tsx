"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import Image from "next/image"

export function SocialProof() {
  const { t, dir } = useLanguage()

  return (
    <motion.section
      className="py-12 bg-muted"
      dir={dir}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="text-xl font-medium">{t("socialProof.title")}</h3>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <motion.div
              className="relative h-40 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diagnostics.jpg-PKxHvAM4wiPiGqVG1zyLyxp09JGGFG.jpeg"
                alt="Diagnostic services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-3 text-white">
                  <p className="font-medium">Professional Diagnostics</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative h-40 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ac-repair.jpg-9wjrINqN4wrxKjiKRqIIa3TQ136jZF.jpeg"
                alt="AC repair"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-3 text-white">
                  <p className="font-medium">Expert AC Repairs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold">{t("socialProof.needFast")}</h3>
          <p className="mt-2">{t("socialProof.callUs")}</p>
          <motion.a
            href="tel:+40741318528"
            className="mt-4 text-xl font-bold inline-flex items-center hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
            +40 741 318 528
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}
