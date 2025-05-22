import { cn } from "@/lib/utils"
import { Wrench } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-10 w-10 overflow-hidden">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></div>
        <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
          <Wrench className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        RepairMaster
      </span>
    </div>
  )
}
