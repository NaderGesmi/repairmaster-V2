"use client"

import { Instagram, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function SocialCTA() {
  const { t, dir } = useLanguage()

  return (
    <div className="bg-primary/5 py-6" dir={dir}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t("social.seeRealRepairs")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://tiktok.com/@repairversehub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="h-5 w-5">🎵</span>
                <span>@repairversehub</span>
              </a>
              <a
                href="https://instagram.com/repairversehub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>@repairversehub</span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t("social.needQuickService")}
            </p>
            <Button asChild>
              <a href="tel:+40741318528" className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Phone className="h-4 w-4" />
                <span>+40 741 318 528</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 