"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function StickyContact() {
  const { t, dir } = useLanguage()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" dir={dir}>
      <motion.a
        href="tel:+40741318528"
        className={cn(
          "flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors",
          "text-sm font-medium"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone className="h-4 w-4" />
        <span className="hidden sm:inline">+40 741 318 528</span>
      </motion.a>

      <motion.a
        href="https://wa.me/40741318528"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition-colors",
          "text-sm font-medium"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </motion.a>
    </div>
  )
} 