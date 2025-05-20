"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const { t, dir } = useLanguage()

  const testimonials = [
    {
      name: "Alexandru P.",
      text: t("testimonials.alex"),
      rating: 5,
    },
    {
      name: "Gabriela S.",
      text: t("testimonials.gabriela"),
      rating: 5,
    },
    {
      name: "Mihai D.",
      text: t("testimonials.mihai"),
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-16 bg-background" dir={dir}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("testimonials.title")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardContent className="flex-grow pt-6">
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <p className="font-medium">{testimonial.name}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
