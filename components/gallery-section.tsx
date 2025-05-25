"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import Image from "next/image"

export function GallerySection() {
  const { t, dir } = useLanguage()

  const galleryImages = [
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181373/gallery/gkhamomq3p3m5cw5sct8.jpg",
      alt: "Gallery Image 1"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181372/gallery/fxejsw5in7fcxin6seqw.jpg",
      alt: "Gallery Image 2"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181372/gallery/hfnkrju22tlycx2gewkg.jpg",
      alt: "Gallery Image 3"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181372/gallery/csgc6tbblkjawx36kza8.jpg",
      alt: "Gallery Image 4"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/ko3olmn0mg3kbxk2mfoz.jpg",
      alt: "Gallery Image 5"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/wxk5eovzimpwliqzfrcm.jpg",
      alt: "Gallery Image 6"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/bp7sl1ht5scdl1m11rhm.jpg",
      alt: "Gallery Image 7"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/rdmmmlany4gq7qrbzuva.jpg",
      alt: "Gallery Image 8"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/rdmmmlany4gq7qrbzuva.jpg", // Repeated URL based on user's list
      alt: "Gallery Image 9"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/qg8znyqw19piexxnpasc.jpg",
      alt: "Gallery Image 10"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/oedzdocydwu0hpjlukam.jpg",
      alt: "Gallery Image 11"
    },
    {
      src: "https://res.cloudinary.com/katakuri740/image/upload/v1748181371/gallery/vhesqfsv20dkkxqo9r44.jpg",
      alt: "Gallery Image 12"
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