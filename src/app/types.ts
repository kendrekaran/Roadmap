export interface LanguageNode {
    name: string;
    timeToComplete: string;
    alternatives?: string[];
  }
  
  export interface RoadmapLevel {
    level: string;
    emoji: string;
    color: string;
    languages: LanguageNode[];
  }
  
  export interface RoadmapData {
    career: string;
    levels: RoadmapLevel[];
  }
  
  export interface RoadmapResponse {
    roadmap: RoadmapData | null;
    error: string | null;
  }