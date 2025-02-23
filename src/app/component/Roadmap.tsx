"use client"
import React, { useState } from 'react';
import { ChevronDown, Code2, BookOpen, Target, ExternalLink } from 'lucide-react';
import { Button } from '@comp/components/ui/button';
import { Card, CardContent, CardHeader } from '@comp/components/ui/card';
import { Badge } from '@comp/components/ui/badge';

interface LanguageNode {
  name: string;
  timeToComplete: string;
  alternatives?: string[];
  description?: string;
  keyFeatures?: string[];
  useCases?: string[];
  learningResources?: { name: string; url: string }[];
}

interface RoadmapLevel {
  level: string;
  emoji: string;
  color: string;
  languages: LanguageNode[];
}

const colorSchemes = {
  blue: {
    gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
    border: "hover:border-blue-400/50",
    shadow: "hover:shadow-blue-400/20",
    text: "text-blue-50",
    badge: "bg-blue-500/20 text-blue-100",
    accent: "from-blue-100 to-blue-300"
  },
  purple: {
    gradient: "bg-gradient-to-r from-violet-400 to-violet-600",
    border: "hover:border-violet-400/50",
    shadow: "hover:shadow-violet-400/20",
    text: "text-violet-50",
    badge: "bg-violet-500/20 text-violet-100",
    accent: "from-violet-100 to-violet-300"
  },
  gold: {
    gradient: "bg-gradient-to-r from-amber-400 to-amber-600",
    border: "hover:border-amber-400/50",
    shadow: "hover:shadow-amber-400/20",
    text: "text-amber-50",
    badge: "bg-amber-500/20 text-amber-100",
    accent: "from-amber-100 to-amber-300"
  }
};

export const RoadmapCard: React.FC<{ level: RoadmapLevel; index: number }> = ({ level }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const scheme = colorSchemes[level.level.toLowerCase() === 'beginner' ? 'blue' : 
                           level.level.toLowerCase() === 'intermediate' ? 'purple' : 'gold'];

  return (
    <div className="mb-24">
      <div className="flex items-center mb-12 gap-8">
        <div className={`
          w-24 h-24 
          ${scheme.gradient}
          rounded-2xl 
          flex items-center justify-center 
          shadow-lg
          ring-1 ring-white/10
          backdrop-blur-xl
          transform hover:scale-105 transition-all duration-500
        `}>
          <span className="text-5xl">{level.emoji}</span>
        </div>
        <div>
          <h2 className={`text-5xl font-bold bg-gradient-to-r ${scheme.accent} bg-clip-text text-transparent tracking-tight`}>
            {level.level} Level
          </h2>
          <p className="text-gray-400 mt-3 text-xl font-light">Master these technologies</p>
        </div>
      </div>

      <div className="grid gap-6">
        {level.languages.map((lang, idx) => (
          <Card
            key={`${level.level}-${lang.name}-${idx}`}
            className={`
              backdrop-blur-xl
              bg-gray-950/40
              border-gray-800/20 
              ${scheme.border}
              hover:shadow-2xl 
              ${scheme.shadow}
              transition-all 
              duration-500
              group
              rounded-2xl
              hover:-translate-y-1
              hover:bg-gray-900/50
            `}
          >
            <CardHeader 
              className="cursor-pointer select-none px-8 py-6"
              onClick={() => setExpandedCard(expandedCard === lang.name ? null : lang.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`
                    h-3 w-3 rounded-full 
                    ${scheme.gradient}
                    group-hover:animate-pulse
                    ring-1 ring-white/20
                  `} />
                  <span className="text-gray-50 font-medium text-2xl tracking-tight">
                    {lang.name}
                  </span>
                </div>
                <ChevronDown 
                  className={`
                    w-6 h-6 
                    ${scheme.text}
                    transition-all duration-300 ease-in-out
                    ${expandedCard === lang.name ? 'rotate-180' : ''}
                    opacity-60 group-hover:opacity-100
                  `} 
                />
              </div>

              <div className="pl-9 space-y-4 mt-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="secondary" className={`${scheme.badge} px-4 py-1.5 text-sm font-medium rounded-full`}>
                    ⏱ {lang.timeToComplete}
                  </Badge>
                  {lang.alternatives && (
                    <Badge variant="secondary" className={`${scheme.badge} px-4 py-1.5 text-sm font-medium rounded-full`}>
                      ↔ Alternatives: {lang.alternatives.join(", ")}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedCard === lang.name && (
              <CardContent className="space-y-10 px-8 pb-8">
                {lang.description && (
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    {lang.description}
                  </p>
                )}

                {lang.keyFeatures && (
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-3 text-gray-100 text-lg">
                      <Code2 className={`w-5 h-5 ${scheme.text}`} />
                      Key Features
                    </h4>
                    <ul className="grid gap-3 pl-2">
                      {lang.keyFeatures.map((feature, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-3 text-base font-light">
                          <span className={`${scheme.text} text-sm mt-1.5`}>◆</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lang.useCases && (
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-3 text-gray-100 text-lg">
                      <Target className={`w-5 h-5 ${scheme.text}`} />
                      Use Cases
                    </h4>
                    <ul className="grid gap-3 pl-2">
                      {lang.useCases.map((useCase, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-3 text-base font-light">
                          <span className={`${scheme.text} text-sm mt-1.5`}>◆</span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lang.learningResources && (
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-3 text-gray-100 text-lg">
                      <BookOpen className={`w-5 h-5 ${scheme.text}`} />
                      Learning Resources
                    </h4>
                    <ul className="grid gap-2">
                      {lang.learningResources.map((resource, i) => (
                        <li key={i}>
                          <Button
                            variant="ghost"
                            className={`
                              ${scheme.text} 
                              hover:bg-gray-800/30 
                              text-left w-full 
                              justify-start 
                              gap-3 
                              py-4
                              text-base
                              font-light
                              transition-all
                              duration-300
                              rounded-xl
                            `}
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            <ExternalLink className="w-5 h-5 opacity-70" />
                            {resource.name}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;