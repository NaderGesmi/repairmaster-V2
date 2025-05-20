"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Loader2, CheckCircle, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"

export function ContactSection() {
  const { t, dir } = useLanguage()
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = t("contact.errors.nameRequired")
    if (!email.trim()) newErrors.email = t("contact.errors.emailRequired")
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = t("contact.errors.emailInvalid")
    if (!phone.trim()) newErrors.phone = t("contact.errors.phoneRequired")
    if (!date) newErrors.date = t("contact.errors.dateRequired")
    if (!time) newErrors.time = t("contact.errors.timeRequired")

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setFormStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormStatus("success")

      // Reset form
      setName("")
      setEmail("")
      setPhone("")
      setDate(undefined)
      setTime("")
      setMessage("")
    } catch (error) {
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      id="contact"
      className="py-16 bg-background"
      dir={dir}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("contact.title")}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diagnostics.jpg-PKxHvAM4wiPiGqVG1zyLyxp09JGGFG.jpeg"
                alt="Professional diagnostics"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold">{t("contact.orContactDirectly")}</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+40741318528" className="hover:underline">
                  +40 741 318 528
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ac-repair.jpg-9wjrINqN4wrxKjiKRqIIa3TQ136jZF.jpeg"
                    alt="AC repair"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freon.jpg-L1D9LsAwzSX4Duuu4996tiQxCjHKA2.jpeg"
                    alt="Freon check"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form className="grid gap-6 bg-card p-6 rounded-xl shadow-lg border" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                  {t("contact.name")}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.namePlaceholder")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                  {t("contact.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.emailPlaceholder")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className={errors.phone ? "text-destructive" : ""}>
                  {t("contact.phone")}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("contact.phonePlaceholder")}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>
              <div className="grid gap-2">
                <Label className={errors.date ? "text-destructive" : ""}>{t("contact.date")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        errors.date && "border-destructive",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
                      {date ? format(date, "PPP") : t("contact.selectDate")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time" className={errors.time ? "text-destructive" : ""}>
                  {t("contact.time")}
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time" className={errors.time ? "border-destructive" : ""}>
                    <SelectValue placeholder={t("contact.selectTime")} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((timeSlot) => (
                      <SelectItem key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />
                    {t("contact.submitting")}
                  </>
                ) : (
                  t("contact.submit")
                )}
              </Button>

              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                  <p>{t("contact.successMessage")}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
