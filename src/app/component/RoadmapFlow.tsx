'use client';

import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';

interface LanguageNode {
  name: string;
  timeToComplete?: string;
  description?: string;
  keyTopics?: string[];
  alternatives?: string[];
  resources?: string[];
  difficulty?: string;
}

interface CustomNodeData {
  label: string;
  emoji: string;
  background: string;
  borderColor: string;
  description: string;
  skills: string[];
  projectIdeas: string[];
  estimatedTimeframe: string;
  languages: LanguageNode[];
}

const CustomNode = ({ data }: { data: CustomNodeData }) => (
  <div 
    className="p-6 rounded-lg border-2 shadow-xl min-w-[300px] max-w-[400px] text-left" 
    style={{
      background: data.background,
      borderColor: data.borderColor
    }}
  >
    <Handle type="target" position={Position.Top} />
    
    <div className="font-bold text-xl mb-3 text-center">
      {data.emoji} {data.label}
    </div>
    
    <div className="text-gray-200 mb-4 text-sm">
      {data.description}
    </div>
    
    <div className="space-y-4">
      <div>
        <div className="font-semibold mb-2 text-gray-300">Languages:</div>
        {data.languages.map((lang, i) => (
          <div key={i} className="mb-3 bg-black/20 p-3 rounded">
            <div className="font-medium text-gray-200">{lang.name}</div>
            {lang.description && (
              <div className="text-sm text-gray-300 mt-1">{lang.description}</div>
            )}
            {lang.timeToComplete && (
              <div className="text-sm text-gray-400 mt-1">
                Time: {lang.timeToComplete}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div>
        <div className="font-semibold mb-2 text-gray-300">Project Ideas:</div>
        <div className="text-sm text-gray-300">
          {data.projectIdeas.join(' • ')}
        </div>
      </div>
      
      <div className="text-sm text-gray-400">
        Estimated timeframe: {data.estimatedTimeframe}
      </div>
    </div>
    
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const nodeTypes = {
  custom: CustomNode,
};

interface RoadmapFlowProps {
  roadmapData: {
    levels: {
      level: string;
      emoji: string;
      color: string;
      description: string;
      skills: string[];
      projectIdeas: string[];
      estimatedTimeframe: string;
      languages: LanguageNode[];
    }[];
  };
}

export default function RoadmapFlow({ roadmapData }: RoadmapFlowProps) {
  const initialNodes: Node[] = roadmapData.levels.map((level, index) => ({
    id: (index + 1).toString(),
    type: 'custom',
    position: { x: 350, y: index * 400 }, // Increased vertical spacing
    data: {
      label: level.level,
      emoji: level.emoji,
      description: level.description,
      skills: level.skills,
      projectIdeas: level.projectIdeas,
      estimatedTimeframe: level.estimatedTimeframe,
      background: level.color === 'blue'
        ? 'rgba(59, 130, 246, 0.1)'
        : level.color === 'purple'
        ? 'rgba(147, 51, 234, 0.1)'
        : 'rgba(234, 179, 8, 0.1)',
      borderColor: level.color === 'blue'
        ? '#3B82F6'
        : level.color === 'purple'
        ? '#9333EA'
        : '#EAB308',
      languages: level.languages
    }
  }));

  const initialEdges: Edge[] = roadmapData.levels.slice(0, -1).map((_, index) => ({
    id: `e${index + 1}-${index + 2}`,
    source: (index + 1).toString(),
    target: (index + 2).toString(),
    animated: true,
    style: { stroke: '#4B5563', strokeWidth: 2 }
  }));

  return (
    <div className="w-full h-[1200px] bg-gray-900 rounded-xl overflow-hidden"> {/* Increased height */}
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-900"
      >
        <Background color="#333" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}