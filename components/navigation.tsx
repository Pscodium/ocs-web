"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold text-foreground hover:text-primary cursor-pointer transition-colors font-mono"
          >
            {"<PL />"}
          </button>
          <div className="flex gap-8">
            {["sobre", "skills", "experiencia", "contato"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
