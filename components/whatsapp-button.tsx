"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const { t } = useLanguage()

  const handleClick = () => {
    const phone = "+40741318528"
    const message = t("contact.whatsappMessage", { name: "" })
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Contact on WhatsApp</span>
    </motion.button>
  )
} 