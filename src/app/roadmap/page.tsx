
import { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: 'Roadmap',
};

async function getData() {
  const response = await fetch('http://localhost:3000/api/setData', {
    cache: 'no-store'
  });
  const data = await response.json();
  return data.data;
}

export default async function RoadmapPage() {
  const data = await getData();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950/50 to-black overflow-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:py-8 text-center relative">
        <div className="relative z-10 space-y-8 py-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-base bg-gradient-to-b from-white to-gray-600 text-transparent bg-clip-text max-w-4xl mx-auto leading-tight tracking-tight">
              {data || 'Developer'}&nbsp;
              <span className="bg-gradient-to-b from-blue-500 to-blue-800 text-transparent bg-clip-text">
                - Roadmap
              </span>
            </h1>
          </div>

          <div className="mt-32 flex flex-wrap justify-center items-center gap-12">
            <div className="text-gray-400 text-sm font-medium hover:text-gray-300 transition-colors">
              Bottom Content
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}