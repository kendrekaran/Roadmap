// components/Mermaid.tsx
'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mermaidRef.current) return;

    const renderDiagram = async () => {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        securityLevel: 'loose',
      });

      try {
        const { svg } = await mermaid.render('mermaid-diagram', chart);
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className="flex justify-center">
      <div ref={mermaidRef} className="mermaid-container w-full" />
    </div>
  );
}