"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { IConfig } from "@/lib/config/IConfig"

export function Hero({ config }: { config: IConfig }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`max-w-4xl transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6">
            <span className="text-primary font-mono text-sm">{"// Olá, eu sou"}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance">
            {config.firstName} <span className="text-primary">{config.lastName}</span>
          </h1>
          <h2 className="text-2xl md:text-4xl text-muted-foreground mb-8 font-mono">
            {"<"}
            <span className="text-accent">{config.title}</span>
            {" />"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            {config.description}
          </p>
          <div className="flex gap-4">
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 bg-primary cursor-pointer text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-medium"
            >
              {config.buttonTextExperience}
            </button>
            <button
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 cursor-pointer border border-border rounded-lg hover:bg-secondary transition-all hover:scale-105 font-medium"
            >
              {config.buttonTextContact}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  )
}
