import type { Metadata } from "next"
import React from "react"
import Navbar from "../component/Navbar"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Code2 } from "lucide-react"
import { RoadmapCard } from "../component/Roadmap"


const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!API_KEY) {
  throw new Error("Missing Gemini API key")
}

const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

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
    const exampleJson = {
      career: career,
      levels: [
        {
          level: "Beginner",
          emoji: "🎯",
          color: "blue",
          languages: [
            {
              name: "Python",
              timeToComplete: "2-3 months",
              alternatives: ["JavaScript", "Ruby"],
              description: "A beginner-friendly language for learning programming concepts",
              keyFeatures: [
                "Easy to read syntax",
                "Large standard library",
                "Great community support"
              ],
              useCases: [
                "Web Development",
                "Data Science"
              ],
              learningResources: [
                {
                  name: "Python Official Docs",
                  url: "https://docs.python.org"
                }
              ]
            }
          ]
        }
      ]
    };

    const prompt = `Create a programming roadmap for ${career}. Return a valid JSON object matching this example structure EXACTLY:
${JSON.stringify(exampleJson, null, 2)}

Required format:
1. Three levels: "Beginner" (blue/🎯), "Intermediate" (purple/⚡), "Advanced" (gold/🎮)
2. 3-4 languages per level
3. Each language must have all fields shown in the example
4. All URLs must be real and accessible
5. Keep descriptions concise
6. Must be valid JSON with no trailing commas

For non-technical careers, return: {"error": "Please enter a technical career path"}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text()
      .replace(/```json\s*|\s*```/g, '')
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .trim();

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-gray-900 to-black/80">
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
