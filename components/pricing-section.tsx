"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function PricingSection() {
  const { t, dir } = useLanguage()

  const tvPricing = [
    { size: '32"', standard: "250 lei", promo: "198 lei", savings: "52 lei (20%)" },
    { size: '43"', standard: "350 lei", promo: "280 lei", savings: "70 lei (20%)" },
    { size: '50"', standard: "450 lei", promo: "360 lei", savings: "90 lei (20%)" },
    { size: '55"', standard: "550 lei", promo: "440 lei", savings: "110 lei (20%)" },
  ]

  const acPricing = [
    { service: t("pricing.acCleaning"), price: "250 lei", promo: "200 lei", savings: "50 lei (20%)" },
    { service: t("pricing.acInstallation"), price: "450 lei", promo: "360 lei", savings: "90 lei (20%)" },
    { service: t("pricing.freonCheck"), price: "200 lei", promo: "160 lei", savings: "40 lei (20%)" },
  ]

  return (
    <section id="pricing" className="py-16 bg-muted" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("pricing.title")}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("pricing.subtitle")}</p>
        </motion.div>

        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="tv" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="tv" className="text-base py-3">
                {t("pricing.tvTab")}
              </TabsTrigger>
              <TabsTrigger value="ac" className="text-base py-3">
                {t("pricing.acTab")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tv" className="mt-6">
              <div className="rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden">
                <div className="grid grid-cols-4 bg-primary/10 p-4 font-medium text-sm">
                  <div>{t("pricing.size")}</div>
                  <div>{t("pricing.standardPrice")}</div>
                  <div>{t("pricing.promoPrice")}</div>
                  <div>{t("pricing.savings")}</div>
                </div>
                <div className="divide-y">
                  {tvPricing.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 p-4 items-center hover:bg-muted/50 transition-colors">
                      <div className="font-medium">{item.size}</div>
                      <div className="text-muted-foreground line-through">{item.standard}</div>
                      <div className="font-bold text-primary">{item.promo}</div>
                      <div className="text-green-600 dark:text-green-400 font-medium">{item.savings}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 flex justify-center">
                  <Button asChild size="lg" className="px-8">
                    <Link href="#contact">{t("pricing.bookNow")}</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ac" className="mt-6">
              <div className="rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden">
                <div className="grid grid-cols-4 bg-primary/10 p-4 font-medium text-sm">
                  <div>{t("pricing.service")}</div>
                  <div>{t("pricing.standardPrice")}</div>
                  <div>{t("pricing.promoPrice")}</div>
                  <div>{t("pricing.savings")}</div>
                </div>
                <div className="divide-y">
                  {acPricing.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 p-4 items-center hover:bg-muted/50 transition-colors">
                      <div className="font-medium">{item.service}</div>
                      <div className="text-muted-foreground line-through">{item.price}</div>
                      <div className="font-bold text-primary">{item.promo}</div>
                      <div className="text-green-600 dark:text-green-400 font-medium">{item.savings}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 flex justify-center">
                  <Button asChild size="lg" className="px-8">
                    <Link href="#contact">{t("pricing.bookNow")}</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-card rounded-xl p-6 border shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">{t("pricing.benefits")}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>{t("pricing.benefits1")}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>{t("pricing.benefits2")}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>{t("pricing.benefits3")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
