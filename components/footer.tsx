"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { Phone, MessageSquare, Mail, Instagram, Youtube, CreditCard, Wallet, Building } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  const { t, dir } = useLanguage()

  const services = [
    { name: t("footer.services.tv"), href: "#" },
    { name: t("footer.services.acCleaning"), href: "#" },
    { name: t("footer.services.acInstallation"), href: "#" },
    { name: t("footer.services.freon"), href: "#" },
    { name: t("footer.services.diagnostics"), href: "#" },
  ]

  const info = [
    { name: t("footer.info.about"), href: "#" },
    { name: t("footer.info.terms"), href: "#" },
    { name: t("footer.info.privacy"), href: "#" },
    { name: t("footer.info.warranty"), href: "#" },
    { name: t("footer.info.faq"), href: "#" },
  ]

  return (
    <footer className="bg-muted py-12 border-t" dir={dir}>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
            <div className="flex space-x-4 mt-4 rtl:space-x-reverse">
              <Link href="tel:+40741318528" className="text-muted-foreground hover:text-foreground">
                <Phone className="h-5 w-5" />
                <span className="sr-only">Phone</span>
              </Link>
              <Link href="https://wa.me/40741318528" className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Message</span>
              </Link>
              <Link href="mailto:contact@repairmaster.ro" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link href="https://instagram.com/repairversehub" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com/repairversehub" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.servicesTitle")}</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.infoTitle")}</h3>
            <ul className="space-y-2">
              {info.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.contactTitle")}</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>{t("footer.address")}</p>
              <p>{t("footer.phone")}</p>
              <p>{t("footer.email")}</p>
              <p>{t("footer.hours")}</p>
            </address>
            <div className="flex space-x-4 mt-4 rtl:space-x-reverse">
              <CreditCard className="h-5 w-5" />
              <Wallet className="h-5 w-5" />
              <Building className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© 2023 RepairMaster. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}
