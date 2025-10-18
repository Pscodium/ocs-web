"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Calendar } from "lucide-react"
import { IConfig } from "@/lib/config/IConfig"
import moment from "moment"

export function Experience({ config }: { config: IConfig }) {
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

  function calculateDuration(startDate: string, endDate?: string | null): string {
    const start = moment(startDate)
    const end = endDate ? moment(endDate) : moment()
    const months = end.diff(start, 'months')
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    let duration = ''
    if (years > 0) {
      duration += `${years} ano${years > 1 ? 's' : ''}`
    }
    if (remainingMonths > 0) {
      if (duration) duration += ' e '
      duration += `${remainingMonths} ${remainingMonths > 1 ? 'meses' : 'mês'}`
    }
    return duration || 'Menos de um mês'
  }

  const experiences = [
    {
      company: "Assertiva",
      role: "Desenvolvedor Backend",
      period: "4 meses",
      current: true,
      description: "Desenvolvimento de microsserviços e APIs escaláveis",
    },
    {
      company: "Getnet",
      role: "Desenvolvedor Backend",
      period: "8 meses",
      current: false,
      description: "Soluções de pagamento e integração de sistemas financeiros",
    },
    {
      company: "Loopert",
      role: "Desenvolvedor Fullstack",
      period: "8 meses",
      current: false,
      description: "Desenvolvimento de aplicações web completas",
    },
    {
      company: "Camerite",
      role: "Desenvolvedor Fullstack",
      period: "2 anos e 5 meses",
      current: false,
      description: "Desenvolvimento e manutenção de sistemas empresariais",
    },
    {
      company: "Imobo",
      role: "Desenvolvedor Backend",
      period: "3 meses",
      current: false,
      description: "Desenvolvimento de APIs para plataforma imobiliária",
    },
  ]

  return (
    <section id="experiencia" ref={sectionRef} className="py-32">
      <div className="container mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary font-mono text-lg">03.</span> Experiência Profissional
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Minha jornada profissional construindo soluções de software em diferentes empresas e contextos.
          </p>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {config.experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative pl-8 md:pl-20 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:scale-[1.02]">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{exp.company}</h3>
                        <div className="flex items-center gap-2 text-primary font-mono">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{calculateDuration(exp.startDate, exp.endDate)}</span>
                        {!exp.endDate && (
                          <span className="ml-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Atual</span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{exp.responsibilities}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
