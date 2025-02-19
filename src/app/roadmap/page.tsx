"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Roadmap() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');

  useEffect(() => {
    console.log("Query Parameter Data:", data); // Debugging: Log the value
  }, [data]);

  return (
    <div>
      <h1>Received Data:</h1>
      <p>{data}</p>
    </div>
  );
}