// components/SearchInput.tsx
'use client';

import React, { useState } from 'react';
import { Input } from '@comp/components/ui/input';
import { Code2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImputDat() {
  const [inputData, setInputData] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputData.trim()) {
      try {
        // Send data to API route
        const response = await fetch('/api/setData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: inputData }),
        });

        if (response.ok) {
          // Navigate to roadmap page
          router.push('/roadmap');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto relative group"
    >
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Code2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
          </div>
          
          <Input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
              min-w-64 sm:min-w-96 pl-12 sm:pl-14 pr-4 py-6 
              bg-blue-950/20 border-2 border-blue-800/30 rounded-xl
              text-white placeholder:text-blue-500/50 placeholder:sm:text-lg
              transition-all duration-300 ease-out focus:ring-0
            `}
            placeholder="Enter Your Desired Role"
          />

          <div className={`
            absolute bottom-0 left-0 h-[2px] bg-gradient-to-r 
            from-blue-500 to-blue-800 transition-all duration-300
            ${isFocused ? 'w-full' : 'w-0 group-hover:w-1/4'}
          `} />
        </div>

        <button
          type="submit"
          className={`
            relative flex items-center justify-center
            h-14 w-14 rounded-xl bg-blue-800
            transition-all duration-300 ease-out
            hover:bg-blue-400 hover:scale-105 active:scale-95
            disabled:opacity-50 disabled:hover:scale-100
            ${!inputData.trim() && 'opacity-50 cursor-not-allowed'}
          `}
          disabled={!inputData.trim()}
        >
          <Search className="h-6 w-6 text-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-800 opacity-0 blur transition-opacity duration-300 group-hover:opacity-30" />
        </button>
      </div>

      <div className="absolute -z-10 -inset-x-20 top-1/2 -translate-y-1/2">
        <div className="absolute left-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl animate-pulse delay-1000" />
      </div>
    </form>
  );
}