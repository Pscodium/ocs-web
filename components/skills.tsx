"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { IConfig } from "@/lib/config/IConfig"

export function Skills({ config }: { config: IConfig }) {
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

  const skills = {
    Linguagens: ["TypeScript", "Java", "Node.js", "Python"],
    Frameworks: ["NestJS", "Spring Boot", "Next.js", "React", "Flask", "JPA", "Express"],
    Cloud: ["AWS", "Firebase", "Digital Ocean", "Oracle", "Azure"],
    "Serviços AWS": ["S3", "EKS", "EC2", "SNS", "SES", "Lambda", "SQS", "API Gateway", "EventBridge"],
    DevOps: ["Docker", "Kubernetes", "Jenkins", "RabbitMQ", "AMQP"],
    Databases: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "SQL Server", "Firestore"],
    Sistemas: ["Linux", "Windows"],
    "AI/Automation": ["n8n"],
  }

  return (
    <section id="skills" ref={sectionRef} className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary font-mono text-lg">02.</span> Tecnologias & Skills
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Conjunto abrangente de tecnologias e ferramentas que utilizo para construir soluções robustas e escaláveis.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.technologiesAndSkills.map(({category, skills}, index) => (
              <div
                key={category}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-primary font-mono">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
