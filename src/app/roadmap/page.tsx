import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from '@comp/components/ui/card';
import { Loader2 } from 'lucide-react';
import SkillsChart from "../components/SkillsChart";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const metadata: Metadata = {
  title: 'Programming Languages Roadmap',
};

async function getData() {
  try {
    const response = await fetch('http://localhost:3000/api/setData', {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Developer'; // Default fallback value
  }
}

async function generateRoadmap(career: string) {
  try {
    const prompt = `Create a programming languages roadmap for ${career}. Structure the response as follows:

🎯 Beginner Level
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]


🚀 Intermediate Level
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]



⭐ Advanced Level
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]
• [Language Name] - [Single line on why it's essential for ${career}]

Rules:
1. Only include programming languages, no frameworks or tools
2. Keep descriptions under 8 words
3. List in order of importance for ${career}
4. Maximum 3-4 languages per level
5. Focus on languages specifically relevant to ${career}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    if (!text || text.toLowerCase().includes('undefined')) {
      throw new Error('Invalid response from AI');
    }
    
    return { roadmap: text, error: null };
  } catch (error) {
    console.error('Error:', error);
    return { roadmap: null, error: 'Failed to generate roadmap. Please try again.' };
  }
}

export default async function RoadmapPage() {
  const career = await getData();
  const { roadmap, error } = await generateRoadmap(career);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/50 to-black overflow-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:py-8 text-center relative">
        <div className="relative z-10 space-y-8 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-base bg-gradient-to-b from-white to-gray-600 text-transparent bg-clip-text max-w-4xl mx-auto leading-tight tracking-tight">
              Programming Languages: {career}
            </h1>
          </div>

          {roadmap && <SkillsChart markdownContent={roadmap} />}

          <Card className="mt-8 max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-lg border-gray-800">
            <CardContent className="p-6">
              {error ? (
                <div className="text-red-500 text-center p-4">{error}</div>
              ) : !roadmap ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <p className="ml-2 text-gray-400">Generating language roadmap...</p>
                </div>
              ) : (
                <div className="relative py-8">
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500/20 transform -translate-x-1/2"></div>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => {
                        const text = children?.toString() || ""
                        const sections = text.split("\n\n")

                        return (
                          <>
                            {sections.map((section, index) => {
                              const [header, ...items] = section.split("\n")

                              if (header.includes("🎯")) {
                                return (
                                  <div key={index} className="mb-12">
                                    <div className="flex items-center mb-6">
                                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10">
                                        <span className="text-xl">🎯</span>
                                      </div>
                                      <h2 className="ml-4 text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                        Beginner Level
                                      </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {items.map((item, i) => (
                                        <div key={i} className="transform transition-all duration-300 hover:scale-105">
                                          <div className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50">
                                            <div className="flex items-center gap-3">
                                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                                              <span className="text-gray-200 text-sm">{item.replace("• ", "")}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              } else if (header.includes("🚀")) {
                                return (
                                  <div key={index} className="mb-12">
                                    <div className="flex items-center mb-6">
                                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center z-10">
                                        <span className="text-xl">🚀</span>
                                      </div>
                                      <h2 className="ml-4 text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                                        Intermediate Level
                                      </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {items.map((item, i) => (
                                        <div key={i} className="transform transition-all duration-300 hover:scale-105">
                                          <div className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50">
                                            <div className="flex items-center gap-3">
                                              <div className="h-2 w-2 rounded-full bg-purple-500" />
                                              <span className="text-gray-200 text-sm">{item.replace("• ", "")}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              } else if (header.includes("⭐")) {
                                return (
                                  <div key={index} className="mb-12">
                                    <div className="flex items-center mb-6">
                                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center z-10">
                                        <span className="text-xl">⭐</span>
                                      </div>
                                      <h2 className="ml-4 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                        Advanced Level
                                      </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {items.map((item, i) => (
                                        <div key={i} className="transform transition-all duration-300 hover:scale-105">
                                          <div className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-500/50">
                                            <div className="flex items-center gap-3">
                                              <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                              <span className="text-gray-200 text-sm">{item.replace("• ", "")}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              }
                              return null
                            })}
                          </>
                        )
                      },
                    }}
                  >
                    {roadmap}
                  </ReactMarkdown>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">
              This roadmap focuses on programming languages essential for your career path.
              Consider learning frameworks and tools specific to each language as you progress.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}