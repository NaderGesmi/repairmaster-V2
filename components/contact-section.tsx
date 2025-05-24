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
import { format, isBefore, isAfter, setHours, setMinutes, isWeekend, parseISO } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"
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
  const { t, dir, language } = useLanguage()
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const timeZone = "Europe/Bucharest"

  // Get current timezone offset
  const getTimezoneOffset = () => {
    const now = new Date()
    const bucharestTime = formatInTimeZone(now, timeZone, 'HH:mm')
    const userTime = formatInTimeZone(now, Intl.DateTimeFormat().resolvedOptions().timeZone, 'HH:mm')
    
    const [bucharestHours, bucharestMinutes] = bucharestTime.split(':').map(Number)
    const [userHours, userMinutes] = userTime.split(':').map(Number)
    
    const bucharestTotalMinutes = bucharestHours * 60 + bucharestMinutes
    const userTotalMinutes = userHours * 60 + userMinutes
    
    return Math.round((bucharestTotalMinutes - userTotalMinutes) / 60)
  }

  // Format time in Bucharest timezone
  const formatBucharestTime = (date: Date) => {
    return formatInTimeZone(date, timeZone, 'HH:mm')
  }

  // Get timezone warning message
  const getTimezoneWarning = () => {
    const offset = getTimezoneOffset()
    if (offset === 0) return null
    
    const direction = offset > 0 ? 'ahead' : 'behind'
    const hours = Math.abs(offset)
    return `All times shown in Bucharest time (EET/EEST). Your local time is ${hours} hour${hours !== 1 ? 's' : ''} ${direction}.`
  }

  const timeSlots = [
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM"
  ]

  const weekendTimeSlots = [
    "08:00 AM",
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
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM"
  ]

  const getAvailableTimeSlots = (selectedDate: Date | undefined) => {
    if (!selectedDate) return timeSlots
    return isWeekend(selectedDate) ? weekendTimeSlots : timeSlots
  }

  const validateTimeSlot = (selectedDate: Date, selectedTime: string) => {
    // Convert selected time to 24-hour format
    const [time, period] = selectedTime.split(" ")
    let [hours, minutes] = time.split(":").map(Number)
    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0

    // Create date object in user's timezone
    const selectedDateTime = setMinutes(setHours(selectedDate, hours), minutes)
    
    // Get current time in Bucharest
    const now = new Date()
    
    // Format both dates in Bucharest timezone for comparison
    const selectedTimeBucharest = formatInTimeZone(selectedDateTime, timeZone, 'HH:mm')
    const currentTimeBucharest = formatInTimeZone(now, timeZone, 'HH:mm')
    
    // Check if date is in the past
    if (isBefore(selectedDateTime, now)) {
      return "Past dates and times are not allowed"
    }

    // Get hours in Bucharest timezone
    const [bucharestHours] = selectedTimeBucharest.split(':').map(Number)

    // Check weekday vs weekend hours
    if (isWeekend(selectedDateTime)) {
      // Weekend hours: 08:00-23:00
      if (bucharestHours < 8 || bucharestHours >= 23) {
        return "Weekend hours are 08:00-23:00"
      }
    } else {
      // Weekday hours: 18:00-23:00
      if (bucharestHours < 18 || bucharestHours >= 23) {
        return "Weekday hours are 18:00-23:00"
      }
    }

    return null
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = t("contact.errors.nameRequired")
    if (!email.trim()) newErrors.email = t("contact.errors.emailRequired")
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = t("contact.errors.emailInvalid")
    if (!phone.trim()) newErrors.phone = t("contact.errors.phoneRequired")
    if (!date) newErrors.date = t("contact.errors.dateRequired")
    if (!time) newErrors.time = t("contact.errors.timeRequired")
    else if (date) {
      const timeError = validateTimeSlot(date, time)
      if (timeError) newErrors.time = timeError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setFormStatus("idle")
    setErrors({}) // Clear previous errors

    try {
      // Validate with Netlify Function first
      const validationResponse = await fetch('/.netlify/functions/validate-booking', {
        method: 'POST',
        body: JSON.stringify({
          'form-name': 'booking',
          date: date ? format(date, "yyyy-MM-dd") : "",
          time,
          name,
          email,
          phone,
          message
        }),
      })

      const validationResult = await validationResponse.json()

      if (!validationResponse.ok) {
        if (validationResult.error === 'invalid_time_slot' || validationResult.error === 'past_booking') {
          setErrors(prev => ({
            ...prev,
            time: validationResult.message
          }))
          setFormStatus("error")
          return
        }
        throw new Error(validationResult.message || 'Validation failed')
      }

      // If validation passes, submit the form
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })

      if (!response.ok) throw new Error('Form submission failed')

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
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'An error occurred while submitting the form'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRedirectPath = () => {
    switch (language) {
      case "ro":
        return "/multumim"
      case "ar":
        return "/shukran"
      default:
        return "/thank-you"
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
          {getTimezoneWarning() && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              {getTimezoneWarning()}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 mt-12">
          <div className="space-y-6">
            {/* Static form for Netlify build */}
            <form 
              name="booking" 
              method="POST"
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              hidden
            >
              <input type="hidden" name="form-name" value="booking" />
              <input type="hidden" name="bot-field" />
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="tel" name="phone" />
              <input type="date" name="date" />
              <input type="text" name="time" />
              <textarea name="message"></textarea>
            </form>

            {/* Interactive form */}
            <form
              name="booking"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              data-netlify-success={getRedirectPath()}
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              <input type="hidden" name="form-name" value="booking" />
              <input type="hidden" name="bot-field" />

              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <User className="h-5 w-5 text-primary" />
                  <Label htmlFor="name">{t("contact.name")}</Label>
                </div>
                <Input
                  id="name"
                  name="name"
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
                  name="email"
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
                  name="phone"
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
                      disabled={(date) => isBefore(date, new Date())}
                    />
                  </PopoverContent>
                </Popover>
                <input type="hidden" name="date" value={date ? format(date, "yyyy-MM-dd") : ""} />
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
                    {getAvailableTimeSlots(date).map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="time" value={time} />
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <Label htmlFor="message">{t("contact.message")}</Label>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.messagePlaceholder")}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
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

                {/* Error messages */}
                {Object.entries(errors).map(([field, message]) => (
                  <p 
                    key={field} 
                    className="text-sm text-destructive dark:text-red-400"
                    role="alert"
                  >
                    {message}
                  </p>
                ))}

                {/* Form status messages */}
                {formStatus === "success" && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
                    <p className="font-medium">{t("contact.toast.success.title")}</p>
                    <p className="text-sm">{t("contact.toast.success.description")}</p>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                    <p className="font-medium">{t("contact.toast.error.title")}</p>
                    <p className="text-sm">{t("contact.toast.error.description")}</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                {t("contact.orContactDirectly")}
              </h3>
              <div className="space-y-4">
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
