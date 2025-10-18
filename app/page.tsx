import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { getConfig } from "@/lib/config"

export default function Home() {
  const config = getConfig();

  return (
    <main className="min-h-screen bg-background select-text">
      <Navigation />
      <Hero config={config} />
      <About config={config} />
      <Skills config={config} />
      <Experience config={config} />
      <Contact config={config} />
    </main>
  )
}
