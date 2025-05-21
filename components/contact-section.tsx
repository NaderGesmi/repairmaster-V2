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
import { CalendarIcon, Loader2, CheckCircle2, Phone, MessageSquare, Mail, Clock, User, Building2, Wrench } from "lucide-react"
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted to-background" dir={dir}>
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h2 className="text-3xl font-bold" variants={item}>{t("contact.title")}</motion.h2>
          <motion.p className="text-muted-foreground max-w-[600px]" variants={item}>
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        <div className="mx-auto max-w-4xl mt-12">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div 
              className="space-y-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <User className="h-5 w-5 text-primary" />
                  <Label htmlFor="name">{t("contact.name")}</Label>
                </div>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("contact.namePlaceholder")}
                  className="w-full"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="h-5 w-5 text-primary" />
                  <Label htmlFor="email">{t("contact.email")}</Label>
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("contact.emailPlaceholder")}
                  className="w-full"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="h-5 w-5 text-primary" />
                  <Label htmlFor="phone">{t("contact.phone")}</Label>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("contact.phonePlaceholder")}
                  className="w-full"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Calendar className="h-5 w-5 text-primary" />
                  <Label>{t("contact.date")}</Label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{t("contact.selectDate")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Clock className="h-5 w-5 text-primary" />
                  <Label>{t("contact.time")}</Label>
                </div>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("contact.selectTime")} />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <Label htmlFor="message">{t("contact.message")}</Label>
                </div>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  className="min-h-[100px]"
                />
              </motion.div>

              <motion.div variants={item}>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("contact.submitting")}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {t("contact.submit")}
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div className="space-y-4" variants={item}>
                <h3 className="text-xl font-bold">{t("contact.orContactDirectly")}</h3>
                <div className="flex flex-col space-y-4">
                  <a
                    href="tel:+40741318528"
                    className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+40 741 318 528</span>
                  </a>
                  <a
                    href="https://wa.me/40741318528"
                    className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse"
                  >
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="mailto:contact@repairmaster.ro"
                    className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@repairmaster.ro</span>
                  </a>
                </div>
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <h3 className="text-xl font-bold">{t("contact.ourServices")}</h3>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
