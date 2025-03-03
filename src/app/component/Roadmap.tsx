"use client"
import type React from "react"
import { useState } from "react"
import { ChevronDown, Code2, BookOpen, Target, ExternalLink, CheckCircle2 } from "lucide-react"
import { Button } from "@comp/components/ui/button"
import { Card, CardContent, CardHeader } from "@comp/components/ui/card"
import { Badge } from "@comp/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface LanguageNode {
  name: string
  timeToComplete: string
  alternatives?: string[]
  description?: string
  keyFeatures?: string[]
  useCases?: string[]
  learningResources?: { name: string; url: string }[]
}

interface RoadmapLevel {
  level: string
  emoji: string
  color: string
  languages: LanguageNode[]
}

const colorSchemes = {
  blue: {
    gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
    softGradient: "bg-gradient-to-br from-blue-500/10 to-blue-700/10",
    border: "hover:border-blue-500/50",
    shadow: "hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.3)]",
    text: "text-blue-50",
    badge: "bg-blue-500/20 text-blue-100",
    accent: "from-blue-200 to-blue-400",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    ring: "ring-blue-500/20",
  },
  purple: {
    gradient: "bg-gradient-to-br from-violet-500 to-violet-700",
    softGradient: "bg-gradient-to-br from-violet-500/10 to-violet-700/10",
    border: "hover:border-violet-500/50",
    shadow: "hover:shadow-[0_10px_40px_-15px_rgba(139,92,246,0.3)]",
    text: "text-violet-50",
    badge: "bg-violet-500/20 text-violet-100",
    accent: "from-violet-200 to-violet-400",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
    ring: "ring-violet-500/20",
  },
  gold: {
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    softGradient: "bg-gradient-to-br from-amber-500/10 to-amber-700/10",
    border: "hover:border-amber-500/50",
    shadow: "hover:shadow-[0_10px_40px_-15px_rgba(245,158,11,0.3)]",
    text: "text-amber-50",
    badge: "bg-amber-500/20 text-amber-100",
    accent: "from-amber-200 to-amber-400",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    ring: "ring-amber-500/20",
  },
}

export const RoadmapCard: React.FC<{ level: RoadmapLevel; index: number }> = ({ level }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const scheme =
    colorSchemes[
      level.level.toLowerCase() === "beginner"
        ? "blue"
        : level.level.toLowerCase() === "intermediate"
          ? "purple"
          : "gold"
    ]

  return (
    <div className="mb-40 relative">
      {/* Background decorative elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 ${scheme.gradient} rounded-full opacity-5 blur-3xl`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 ${scheme.gradient} rounded-full opacity-5 blur-3xl`}></div>
      </div>

      {/* Level header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center mb-20 gap-8">
        <div
          className={`
          w-28 h-28 
          ${scheme.gradient}
          rounded-2xl 
          flex items-center justify-center 
          shadow-lg
          ring-2 ring-white/20
          backdrop-blur-xl
          transform hover:scale-105 transition-all duration-500
          ${scheme.glow}
          relative
          overflow-hidden
          group
          rotate-3
        `}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-white blur-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <span className="text-6xl relative z-10">{level.emoji}</span>
        </div>
        <div className="relative">
          <h2
            className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${scheme.accent} bg-clip-text text-transparent tracking-tight`}
          >
            {level.level} Level
          </h2>
          <p className="text-gray-300 mt-4 text-xl md:text-2xl font-light max-w-2xl">
            Master these technologies to advance your skills
            <span className={`inline-block ml-3 ${scheme.text}`}>—</span>
          </p>
          <div className={`h-1 w-20 mt-6 ${scheme.gradient} rounded-full`}></div>
        </div>
      </div>

      {/* Language cards grid */}
      <div className="grid gap-10 relative">
        {level.languages.map((lang, idx) => (
          <Card
            key={`${level.level}-${lang.name}-${idx}`}
            className={`
              backdrop-blur-xl
              bg-gray-950/40
              border-gray-800/40
              ${scheme.border}
              hover:shadow-2xl 
              ${scheme.shadow}
              transition-all 
              duration-500
              group
              rounded-2xl
              hover:-translate-y-2
              hover:bg-gray-900/50
              overflow-hidden
              ${expandedCard === lang.name ? `${scheme.ring} ring-2` : ""}
            `}
          >
            <CardHeader
              className="cursor-pointer select-none px-10 py-8"
              onClick={() => setExpandedCard(expandedCard === lang.name ? null : lang.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div
                    className={`
                    h-5 w-5 rounded-full 
                    ${scheme.gradient}
                    group-hover:animate-pulse
                    ring-1 ring-white/20
                    flex items-center justify-center
                  `}
                  >
                    {expandedCard === lang.name && (
                      <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                    )}
                  </div>
                  <span className="text-gray-50 font-semibold text-3xl tracking-tight">{lang.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: expandedCard === lang.name ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`
                      p-2 rounded-full
                      ${expandedCard === lang.name ? scheme.softGradient : 'bg-transparent'}  
                      transition-all duration-300
                    `}
                  >
                    <ChevronDown
                      className={`
                        w-6 h-6 
                        ${scheme.text}
                        opacity-60 group-hover:opacity-100
                      `}
                    />
                  </motion.div>
                </div>
              </div>

              <div className="pl-11 space-y-4 mt-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="secondary"
                    className={`
                    ${scheme.badge} 
                    px-4 py-1.5 
                    text-sm 
                    font-medium 
                    rounded-full
                    ${scheme.softGradient}
                    border border-white/5
                  `}
                  >
                    ⏱ {lang.timeToComplete}
                  </Badge>
                  {lang.alternatives && (
                    <Badge
                      variant="secondary"
                      className={`
                      ${scheme.badge} 
                      px-4 py-1.5 
                      text-sm 
                      font-medium 
                      rounded-full
                      ${scheme.softGradient}
                      border border-white/5
                    `}
                    >
                      ↔ Alternatives: {lang.alternatives.join(", ")}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <AnimatePresence>
              {expandedCard === lang.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <CardContent className="space-y-12 px-10 pb-10 pt-4">
                    {lang.description && (
                      <div className="relative">
                        <div
                          className={`absolute left-0 top-0 w-1 h-full ${scheme.gradient} rounded-full opacity-70`}
                        ></div>
                        <p className="text-gray-300 leading-relaxed text-lg font-light pl-8">{lang.description}</p>
                      </div>
                    )}

                    {lang.keyFeatures && (
                      <div className="space-y-6">
                        <h4 className="font-medium flex items-center gap-4 text-gray-100 text-xl">
                          <div className={`p-2.5 rounded-xl ${scheme.softGradient} shadow-lg`}>
                            <Code2 className={`w-5 h-5 ${scheme.text}`} />
                          </div>
                          Key Features
                        </h4>
                        <ul className="grid gap-4 pl-2">
                          {lang.keyFeatures.map((feature, i) => (
                            <li key={i} className="text-gray-300 flex items-start gap-4 text-base font-light hover:text-white transition-colors duration-300">
                              <CheckCircle2 className={`w-5 h-5 ${scheme.text} opacity-90 mt-0.5 flex-shrink-0`} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lang.useCases && (
                      <div className="space-y-6">
                        <h4 className="font-medium flex items-center gap-4 text-gray-100 text-xl">
                          <div className={`p-2.5 rounded-xl ${scheme.softGradient} shadow-lg`}>
                            <Target className={`w-5 h-5 ${scheme.text}`} />
                          </div>
                          Use Cases
                        </h4>
                        <ul className="grid gap-4 pl-2">
                          {lang.useCases.map((useCase, i) => (
                            <li key={i} className="text-gray-300 flex items-start gap-4 text-base font-light hover:text-white transition-colors duration-300">
                              <CheckCircle2 className={`w-5 h-5 ${scheme.text} opacity-90 mt-0.5 flex-shrink-0`} />
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lang.learningResources && (
                      <div className="space-y-6">
                        <h4 className="font-medium flex items-center gap-4 text-gray-100 text-xl">
                          <div className={`p-2.5 rounded-xl ${scheme.softGradient} shadow-lg`}>
                            <BookOpen className={`w-5 h-5 ${scheme.text}`} />
                          </div>
                          Learning Resources
                        </h4>
                        <ul className="grid gap-4">
                          {lang.learningResources.map((resource, i) => (
                            <li
                              key={i}
                              className={`
                              rounded-xl 
                              overflow-hidden
                              ${scheme.softGradient}
                              border border-white/5
                              transition-all
                              duration-300
                              hover:border-white/20
                              group/resource
                              shadow-md hover:shadow-lg
                            `}
                            >
                              <Button
                                variant="ghost"
                                className={`
                                  ${scheme.text} 
                                  hover:bg-white/10
                                  text-left w-full 
                                  justify-start 
                                  gap-4 
                                  py-5
                                  px-6
                                  text-base
                                  font-light
                                  transition-all
                                  duration-300
                                  rounded-xl
                                  h-auto
                                `}
                                onClick={() => window.open(resource.url, "_blank")}
                              >
                                <div className="p-2 rounded-lg bg-white/10 flex-shrink-0 group-hover/resource:bg-white/15 transition-all duration-300">
                                  <ExternalLink className="w-5 h-5 group-hover/resource:translate-x-0.5 group-hover/resource:-translate-y-0.5 transition-transform duration-300" />
                                </div>
                                <span className="line-clamp-1">{resource.name}</span>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RoadmapCard