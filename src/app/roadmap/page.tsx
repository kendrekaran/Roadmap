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
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

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
    const response = await fetch("http://localhost:3000/api/setData", {
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
    // Simplified prompt structure
    const prompt = `Create a programming roadmap for ${career} with EXACTLY this JSON structure and no additional text:
{
  "career": "${career}",
  "levels": [
    {
      "level": "Beginner",
      "emoji": "🎯",
      "color": "blue",
      "languages": [
        {
          "name": "Language name",
          "timeToComplete": "X-Y months",
          "alternatives": ["Alt1", "Alt2"],
          "description": "Brief description",
          "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"],
          "useCases": ["Use case 1", "Use case 2"],
          "learningResources": [
            {
              "name": "Resource name",
              "url": "https://example.com"
            }
          ]
        }
      ]
    }
  ]
}

Rules:
- 3 levels only: Beginner (blue/🎯), Intermediate (purple/⚡), Advanced (gold/🎮)
- 3-4 languages per level
- All text must be properly escaped
- No trailing commas
- Valid JSONv`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Clean and validate JSON
    try {
      // Remove any markdown formatting
      text = text.replace(/```json\s*|\s*```/g, '').trim();
      
      // Try to find the JSON object boundaries
      const startIdx = text.indexOf('{');
      const endIdx = text.lastIndexOf('}');
      
      if (startIdx === -1 || endIdx === -1) {
        throw new Error('Invalid JSON structure');
      }

      // Extract just the JSON part
      text = text.slice(startIdx, endIdx + 1);

      // Parse the cleaned JSON
      const data = JSON.parse(text);

      // Basic validation
      if (!data.career || !Array.isArray(data.levels)) {
        throw new Error('Missing required fields');
      }

      // Ensure exactly 3 levels
      if (data.levels.length !== 3) {
        throw new Error('Must have exactly 3 levels');
      }

      // Validate level structure
      data.levels.forEach((level: RoadmapLevel) => {
        if (!level.level || !level.emoji || !level.color || !Array.isArray(level.languages)) {
          throw new Error('Invalid level structure');
        }
        
        // Validate languages
        level.languages.forEach((lang: LanguageNode) => {
          if (!lang.name || !lang.timeToComplete || !lang.description || 
              !Array.isArray(lang.keyFeatures) || !Array.isArray(lang.useCases) || 
              !Array.isArray(lang.learningResources)) {
            throw new Error('Invalid language structure');
          }
        });
      });

      return { roadmap: data as RoadmapData, error: null };
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.log('Raw response:', text);
      return { 
        roadmap: null, 
        error: 'Failed to parse AI response' 
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
  const { roadmap, error } = await generateRoadmap(career)

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-gray-900 to-black/80">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
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