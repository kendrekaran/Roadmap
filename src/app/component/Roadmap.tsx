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
    gradient: "bg-gradient-to-br from-blue-600 to-blue-800",
    border: "hover:border-blue-500",
    shadow: "hover:shadow-blue-700/30",
    text: "text-blue-200",
    badge: "bg-blue-900/50 text-blue-200",
    accent: "from-blue-200 to-blue-400"
  },
  purple: {
    gradient: "bg-gradient-to-br from-violet-600 to-violet-800",
    border: "hover:border-violet-500",
    shadow: "hover:shadow-violet-700/30",
    text: "text-violet-200",
    badge: "bg-violet-900/50 text-violet-200",
    accent: "from-violet-200 to-violet-400"
  },
  gold: {
    gradient: "bg-gradient-to-br from-amber-600 to-amber-800",
    border: "hover:border-amber-500",
    shadow: "hover:shadow-amber-700/30",
    text: "text-amber-200",
    badge: "bg-amber-900/50 text-amber-200",
    accent: "from-amber-200 to-amber-400"
  }
};

export const RoadmapCard: React.FC<{ level: RoadmapLevel; index: number }> = ({ level }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const scheme = colorSchemes[level.level.toLowerCase() === 'beginner' ? 'blue' : 
                           level.level.toLowerCase() === 'intermediate' ? 'purple' : 'gold'];

  return (
    <div className="mb-16">
      <div className="flex items-center mb-8 gap-6">
        <div className={`
          w-16 h-16 
          ${scheme.gradient}
          rounded-2xl 
          flex items-center justify-center 
          shadow-lg 
          ring-1 ring-white/10
        `}>
          <span className="text-3xl">{level.emoji}</span>
        </div>
        <div>
          <h2 className={`text-3xl font-bold bg-gradient-to-r ${scheme.accent} bg-clip-text text-transparent`}>
            {level.level} Level
          </h2>
          <p className="text-gray-400 mt-1">Master these technologies</p>
        </div>
      </div>

      <div className="grid gap-6">
        {level.languages.map((lang, idx) => (
          <Card
            key={`${level.level}-${lang.name}-${idx}`}
            className={`
              backdrop-blur-sm
              bg-gray-900/90
              border-gray-800/50 
              ${scheme.border}
              hover:shadow-xl 
              ${scheme.shadow}
              transition-all 
              duration-300
              group
            `}
          >
            <CardHeader 
              className="cursor-pointer select-none"
              onClick={() => setExpandedCard(expandedCard === lang.name ? null : lang.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`
                    h-3 w-3 rounded-full 
                    ${scheme.gradient}
                    group-hover:animate-pulse
                    ring-1 ring-white/20
                  `} />
                  <span className="text-gray-100 font-semibold text-lg">
                    {lang.name}
                  </span>
                </div>
                <ChevronDown 
                  className={`
                    w-5 h-5 
                    ${scheme.text} 
                    transition-transform 
                    ${expandedCard === lang.name ? 'rotate-180' : ''}
                  `} 
                />
              </div>

              <div className="pl-7 space-y-3 mt-3">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className={scheme.badge}>
                    ⏱ {lang.timeToComplete}
                  </Badge>
                  {lang.alternatives && (
                    <Badge variant="secondary" className={scheme.badge}>
                      ↔ Alternatives: {lang.alternatives.join(", ")}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedCard === lang.name && (
              <CardContent className="space-y-6 pt-2 pl-7">
                {lang.description && (
                  <p className="text-gray-300 leading-relaxed">
                    {lang.description}
                  </p>
                )}

                {lang.keyFeatures && (
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2 text-gray-100">
                      <Code2 className={`w-4 h-4 ${scheme.text}`} />
                      Key Features
                    </h4>
                    <ul className="grid gap-2">
                      {lang.keyFeatures.map((feature, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2">
                          <span className={`${scheme.text} text-sm`}>•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lang.useCases && (
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2 text-gray-100">
                      <Target className={`w-4 h-4 ${scheme.text}`} />
                      Use Cases
                    </h4>
                    <ul className="grid gap-2">
                      {lang.useCases.map((useCase, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2">
                          <span className={`${scheme.text} text-sm`}>•</span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lang.learningResources && (
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2 text-gray-100">
                      <BookOpen className={`w-4 h-4 ${scheme.text}`} />
                      Learning Resources
                    </h4>
                    <ul className="grid gap-3">
                      {lang.learningResources.map((resource, i) => (
                        <li key={i}>
                          <Button
                            variant="ghost"
                            className={`${scheme.text} hover:bg-gray-800/50 text-left w-full justify-start gap-2`}
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
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