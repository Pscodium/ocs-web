"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Server, Cloud } from "lucide-react"
import { IConfig } from "@/lib/config/IConfig";
import moment from "moment";
import { formatList } from "@/lib/list";

export function About({ config }: { config: IConfig }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const experienceYears = moment().diff(moment(config.experiences[config.experiences.length - 1].endDate), "years");

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
    <section id="sobre" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary font-mono text-lg">01.</span> Sobre mim
          </h2>
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 select-text">
                {config.title} com <span className="text-foreground font-semibold">{experienceYears}+ anos de experiência</span>{" "}
                {config.aboutMeFirstParagraph}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 select-text">
                Atualmente trabalhando na <span className="text-primary font-semibold">{config.currentCompany}</span>, {config.aboutMeSecondParagraph}
              </p>
              <div className="flex gap-4 mt-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-2xl font-bold text-primary">{moment().diff(moment(config.birthDate), "years")}</span>
                  <span className="text-sm">anos</span>
                </div>
                <div className="w-px bg-border" />
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-2xl font-bold text-primary">{experienceYears}+</span>
                  <span className="text-sm">anos de experiência</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: Code2,
                  title: "Backend Development",
                  description: formatList(config.aboutCardSession.find(abt => abt.title === "Backend Development")?.items || []),
                },
                {
                  icon: Cloud,
                  title: "Cloud Computing",
                  description: formatList(config.aboutCardSession.find(abt => abt.title === "Cloud Computing")?.items || []),
                },
                {
                  icon: Server,
                  title: "DevOps & Infrastructure",
                  description: formatList(config.aboutCardSession.find(abt => abt.title === "DevOps & Infrastructure")?.items || []),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
