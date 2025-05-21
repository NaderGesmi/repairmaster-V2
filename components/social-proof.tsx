"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Phone, Instagram } from "lucide-react"
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
          <div className="flex flex-wrap justify-center items-center gap-6">
            <motion.a
              href="https://www.tiktok.com/@repairversehub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-tiktok h-5 w-5 text-primary"></i>
              <span className="text-sm font-medium">TikTok @repairversehub</span>
            </motion.a>
            <motion.a
              href="https://www.instagram.com/repairversehub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Instagram @repairversehub</span>
            </motion.a>
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
            <Phone className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-primary" />
            +40 741 318 528
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#contact"
              className="mt-4 inline-block px-6 py-3 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors"
            >
              Book Online
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
