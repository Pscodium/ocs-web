"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Github, Linkedin } from "lucide-react"
import { IConfig } from "@/lib/config/IConfig"

export function Contact({ config }: { config: IConfig }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contato" ref={sectionRef} className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary font-mono text-lg">04.</span> Vamos trabalhar juntos?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua
            visão. Vamos conversar!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>Enviar email</span>
            </a>
            <a
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-all hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href={config.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-all hover:scale-105"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Desenvolvido por <span className="text-primary font-mono">Peterson Larson</span> • 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
