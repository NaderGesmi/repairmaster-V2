"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tv, Wind, Thermometer, Wrench } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function ServicesSection() {
  const { t, dir } = useLanguage()

  const services = [
    {
      icon: <Tv className="h-10 w-10 text-primary" />,
      title: t("services.tv.title"),
      description: t("services.tv.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tv-repair.jpg-N1XAJlrIFBBbAsFuNBNZm3UM0SvCQ7.jpeg",
    },
    {
      icon: <Wind className="h-10 w-10 text-primary" />,
      title: t("services.acCleaning.title"),
      description: t("services.acCleaning.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ac-cleaning.jpg-irDiDR6N9ufZzPQn9iJAePVbvUI9Dn.jpeg",
    },
    {
      icon: <Thermometer className="h-10 w-10 text-primary" />,
      title: t("services.acInstallation.title"),
      description: t("services.acInstallation.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ac-install.jpg-1xG3XS2via4d8r81AZFhk9HLaAfm3B.jpeg",
    },
    {
      icon: <Wrench className="h-10 w-10 text-primary" />,
      title: t("services.freon.title"),
      description: t("services.freon.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freon.jpg-L1D9LsAwzSX4Duuu4996tiQxCjHKA2.jpeg",
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
              <Card className="flex flex-col h-full overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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
                  <Button variant="outline" className="w-full">
                    {t("services.details")}
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="#contact">{t("services.book")}</Link>
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
