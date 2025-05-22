"use client"

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
import { 
  CalendarIcon, 
  Loader2, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  User, 
  Building2, 
  Wrench, 
  Shield, 
  Settings 
} from "lucide-react"
import { cn } from "@/lib/utils"

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
    <section id="contact" className="py-20 bg-gradient-to-b from-muted to-background" dir={dir}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold">{t("contact.title")}</h2>
          <p className="text-muted-foreground max-w-[600px]">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mt-12">
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
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
              </div>

              <div className="space-y-4">
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
              </div>

              <div className="space-y-4">
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
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <CalendarIcon className="h-5 w-5 text-primary" />
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
                  <PopoverContent 
                    className="w-auto p-0 z-[100]"
                    side="bottom"
                    align="start"
                    sideOffset={4}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Clock className="h-5 w-5 text-primary" />
                  <Label>{t("contact.time")}</Label>
                </div>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("contact.selectTime")} />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </div>

              <div className="space-y-4">
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
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
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
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                {t("contact.orContactDirectly")}
              </h3>
              <div className="flex flex-col space-y-4">
                <a
                  href="tel:+40741318528"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">+40 741 318 528</span>
                </a>
                <a
                  href="https://wa.me/40741318528"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </a>
                <a
                  href="mailto:contact@repairmaster.ro"
                  className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors rtl:space-x-reverse group"
                >
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">contact@repairmaster.ro</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                {t("contact.ourServices")}
              </h3>
              <div className="grid gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.tv.title")}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.acCleaning.title")}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.acInstallation.title")}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card rtl:space-x-reverse">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{t("services.freon.title")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
