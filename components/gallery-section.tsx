"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import Image from "next/image"

export function GallerySection() {
  const { t, dir } = useLanguage()

  const galleryImages = [
    {
      src: "/images/gallery/tv.jpg",
      alt: "TV Repair Service"
    },
    {
      src: "/images/gallery/tv (2).jpg",
      alt: "TV Repair Service"
    },
    {
      src: "/images/gallery/ac 2.jpg",
      alt: "AC Installation Service"
    },
    {
      src: "/images/gallery/ac 3.jpg",
      alt: "AC Cleaning Service"
    },
    {
      src: "/images/gallery/ac 4.jpg",
      alt: "AC Maintenance Service"
    },
    {
      src: "/images/gallery/ac 5.jpg",
      alt: "AC Service"
    },
    {
      src: "/images/gallery/air condiitoner .jpg",
      alt: "Air Conditioner Service"
    },
    {
      src: "/images/gallery/backlight defected.jpg",
      alt: "TV Backlight Repair"
    },
    {
      src: "/images/gallery/backlight lighthing.jpg",
      alt: "TV Backlight Service"
    },
    {
      src: "/images/gallery/Board.jpg",
      alt: "Circuit Board Repair"
    },
    {
      src: "/images/gallery/psu.jpg",
      alt: "Power Supply Repair"
    }
  ]

  return (
    <section id="gallery" className="py-16 bg-background" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("gallery.title")}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("gallery.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 