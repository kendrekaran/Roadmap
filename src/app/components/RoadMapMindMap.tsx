import React from 'react';
import Mermaid from './Mermaid';

interface RoadmapMindMapProps {
  markdownContent: string;
}

const RoadmapMindMap: React.FC<RoadmapMindMapProps> = ({ markdownContent }) => {
  const parseMindMap = (content: string): string => {
    const sanitizeId = (text: string) => text.replace(/[^a-zA-Z0-9]/g, '_');
    const sections = content.split('\n# ').filter(Boolean);
    
    let mindMap = 'mindmap\n  root((Career Roadmap))';
    
    sections.forEach((section, index) => {
      const lines = section.split('\n');
      const mainHeader = lines[0].trim();
      const mainId = sanitizeId(mainHeader);
      
      mindMap += `\n    ${mainId}["${mainHeader}"]`;
      
      let currentSubsection = '';
      let currentSubId = '';
      
      lines.slice(1).forEach(line => {
        if (line.startsWith('## ')) {
          currentSubsection = line.replace('## ', '').trim();
          currentSubId = sanitizeId(currentSubsection);
          mindMap += `\n      ${currentSubId}["${currentSubsection}"]`;
        } else if (line.startsWith('- ')) {
          const item = line.replace('- ', '').trim();
          const itemId = sanitizeId(item);
          if (currentSubsection) {
            mindMap += `\n        ${itemId}("${item}")`;
          } else {
            mindMap += `\n      ${itemId}("${item}")`;
          }
        }
      });
    });
    
    return mindMap;
  };

  return (
    <div className="w-full">
      <Mermaid chart={parseMindMap(markdownContent)} />
    </div>
  );
};

export default RoadmapMindMap;