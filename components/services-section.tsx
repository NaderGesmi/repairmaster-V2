"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tv, Wind, Thermometer, Wrench, Settings, Shield } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function ServicesSection() {
  const { t, dir } = useLanguage()

  const services = [
    {
      icon: <Tv className="h-10 w-10 text-primary" />,
      title: t("services.tv.title"),
      description: t("services.tv.description"),
      image: "/images/tv-repair.jpg",
    },
    {
      icon: <Wind className="h-10 w-10 text-primary" />,
      title: t("services.acCleaning.title"),
      description: t("services.acCleaning.description"),
      image: "/images/ac-cleaning.jpg",
    },
    {
      icon: <Thermometer className="h-10 w-10 text-primary" />,
      title: t("services.acInstallation.title"),
      description: t("services.acInstallation.description"),
      image: "/images/ac-install.jpg",
    },
    {
      icon: <Wrench className="h-10 w-10 text-primary" />,
      title: t("services.freon.title"),
      description: t("services.freon.description"),
      image: "/images/freon.jpg",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: t("services.diagnostics.title"),
      description: t("services.diagnostics.description"),
      image: "/images/diagnostics.jpg",
    },
  ]

  return (
    <section id="services" className="py-16 bg-background" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("services.title")}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("services.subtitle")}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="flex-grow pt-4">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 pt-2">
                  <Button asChild className="w-full">
                    <Link href="#pricing">{t("services.details")}</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href={`https://wa.me/+40741318528?text=A%C8%99%20dori%20s%C4%83%20programez%20un%20serviciu%20de%20${encodeURIComponent(service.title)}.`}>{t("services.book")}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
