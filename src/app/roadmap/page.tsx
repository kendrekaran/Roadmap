import type { Metadata } from "next"
import React from "react"
import Navbar from "../component/Navbar"
import { Code2 } from "lucide-react"
import { RoadmapCard } from "../component/Roadmap"
import OpenAI from 'openai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!API_KEY) {
  throw new Error("Missing Gemini API key")
}

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL,
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME,
  }
});

export const metadata: Metadata = {
  title: "Programming Languages Roadmap",
  description: "Custom programming language roadmap for your career path",
}

interface LanguageNode {
  name: string
  timeToComplete: string
  alternatives?: string[]
  description: string
  keyFeatures: string[]
  useCases: string[]
  learningResources: {
    name: string
    url: string
  }[]
}

interface RoadmapLevel {
  level: string
  emoji: string
  color: string
  languages: LanguageNode[]
}

interface RoadmapData {
  career: string
  levels: RoadmapLevel[]
}

interface RoadmapResponse {
  roadmap: RoadmapData | null
  error: string | null
}

interface PageData {
  data: string
}

async function getData(): Promise<string> {
  try {
    const response = await fetch("https://sill-path.vercel.app/api/setData", {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json() as PageData
    return data.data || "Developer"
  } catch (error) {
    console.error("Error fetching data:", error)
    return "Developer"
  }
}

async function generateRoadmap(career: string): Promise<RoadmapResponse> {
  if (!career?.trim()) {
    return { roadmap: null, error: 'Career field is required' };
  }

  try {
    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-r1-distill-llama-70b:free",
      messages: [
        {
          role: "system",
          content: "Create concise technical learning roadmaps in JSON format."
        },
        {
          role: "user",
          content: `Create a learning roadmap for ${career} with exactly:
- 3 levels (Beginner 🎯, Intermediate ⚡, Advanced 🎮)
- 2 most important technologies per level
- Brief descriptions
- Only essential features
- Main use cases
- One key learning resource (URL)
Format as valid JSON:
{
  "career": "${career}",
  "levels": [
    {
      "level": "Beginner",
      "emoji": "🎯",
      "color": "blue",
      "languages": [
        {
          "name": "Tech Name",
          "timeToComplete": "Duration",
          "alternatives": ["Alt1"],
          "description": "Brief description",
          "keyFeatures": ["Key1", "Key2"],
          "useCases": ["Use1", "Use2"],
          "learningResources": [{"name": "Resource", "url": "URL"}]
        }
      ]
    }
  ]
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const text = completion.choices[0].message.content;
    if (!text) {
      throw new Error('No response from AI');
    }

    try {
      // Extract JSON content
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) {
        throw new Error('No valid JSON found in response');
      }

      const jsonText = match[0];
      const data = JSON.parse(jsonText);

      // Basic structure validation
      if ('error' in data) {
        return { roadmap: null, error: data.error };
      }

      if (!data.career || !Array.isArray(data.levels)) {
        throw new Error('Invalid response structure');
      }

      // Validate levels
      const requiredLevels = ['Beginner', 'Intermediate', 'Advanced'];
      if (data.levels.length !== 3 || 
          !data.levels.every((level: { level: string }, i: number) => level.level === requiredLevels[i])) {
        throw new Error('Invalid levels structure');
      }

      return { roadmap: data, error: null };
    } catch (parseError) {
      console.error('Parse error:', parseError);
      return { 
        roadmap: null, 
        error: 'Invalid AI response format' 
      };
    }
  } catch (error) {
    console.error('Generation error:', error);
    return { 
      roadmap: null, 
      error: 'Failed to generate roadmap' 
    };
  }
}

const RoadmapPage = async () => {
  const career = await getData()
  const { roadmap } = await generateRoadmap(career)

  return (
    <div className="min-h-screen py-24 sm:py-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-gray-900 to-black/80">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
      <Navbar />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-blue-500 mb-4">
            <Code2 className="w-6 h-6" />
            <h2 className="text-xl font-medium">Programming Roadmap</h2>
            <Code2 className="w-6 h-6" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Your Learning Path
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow this curated roadmap to master programming languages from beginner to advanced level
          </p>
        </div>

        <div className="relative ">
          <div className="absolute  left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/60 via-purple-500/60 to-yellow-500/60"></div>
          
          {roadmap?.levels?.map((level, index) => (
            <RoadmapCard key={level.level} level={level} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            This roadmap is designed to guide you through your programming journey. 
            Remember to practice regularly and build projects along the way to reinforce your learning.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage
