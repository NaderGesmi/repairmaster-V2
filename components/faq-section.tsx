"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function FAQSection() {
  const { t, dir } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems = [
    {
      question: t("faq.warranty.question"),
      answer: t("faq.warranty.answer"),
    },
    {
      question: t("faq.booking.question"),
      answer: t("faq.booking.answer"),
    },
    {
      question: t("faq.payment.question"),
      answer: t("faq.payment.answer"),
    },
    {
      question: t("faq.emergency.question"),
      answer: t("faq.emergency.answer"),
    },
    {
      question: t("faq.diagnostics.question"),
      answer: t("faq.diagnostics.answer"),
    },
    {
      question: t("faq.coverage.question"),
      answer: t("faq.coverage.answer"),
    },
  ]

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
            {t("faq.title")}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    openIndex === index && "transform rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "px-6 overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                )}
              >
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 