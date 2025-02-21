import React from 'react';
import { Card } from '@comp/components/ui/card';

const SkillsChart = ({ markdownContent }) => {
  // Parse the markdown content to extract skills sections
  const parseSkills = (content) => {
    if (!content) return [];
    
    // Look for the Required Skills section and parse individual skills
    const skillsMatch = content.match(/Required Skills[:\n]+((?:.*\n*)*?)(?:\n##|\n\d\.|\n$)/);
    if (!skillsMatch) return [];
    
    const skillsText = skillsMatch[1];
    const skills = skillsText
      .split('\n')
      .filter(line => line.trim().length > 0 && !line.includes('Required Skills'))
      .map(skill => {
        // Try to extract skill name and description if they're separated by a colon or dash
        const [name, ...descParts] = skill.split(/[-:]/);
        const description = descParts.join('-').trim();
        return {
          name: name.replace(/[*-]/g, '').trim(),
          description: description || 'Core technical requirement',
          // Generate a random color from a predefined set
          color: getRandomColor()
        };
      });

    return skills;
  };

  const getRandomColor = () => {
    const colors = [
      "from-blue-500/20 to-blue-600/20 border-blue-500/50",
      "from-purple-500/20 to-purple-600/20 border-purple-500/50",
      "from-cyan-500/20 to-cyan-600/20 border-cyan-500/50",
      "from-green-500/20 to-green-600/20 border-green-500/50",
      "from-yellow-500/20 to-yellow-600/20 border-yellow-500/50",
      "from-pink-500/20 to-pink-600/20 border-pink-500/50"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const skills = parseSkills(markdownContent);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Required Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative group transition-all duration-300 hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
            <Card className="relative h-full bg-gray-900/50 border border-gray-800 backdrop-blur-sm p-4 rounded-lg">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
                <p className="text-gray-400 text-sm flex-grow">{skill.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsChart;