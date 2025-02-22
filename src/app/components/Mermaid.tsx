// components/MermaidChart.js
"use client"
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidChart = ({ chart }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize Mermaid
    mermaid.initialize({ startOnLoad: false, theme: 'default' });

    // Render the chart
    if (chartRef.current) {
      chartRef.current.innerHTML = chart;
      mermaid.init(undefined, chartRef.current);
    }
  }, [chart]);

  return <div ref={chartRef} className="mermaid"></div>;
};

// Disable SSR for this component
export default dynamic(() => Promise.resolve(MermaidChart), { ssr: false });