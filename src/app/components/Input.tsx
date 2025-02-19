"use client";

import React from 'react';
import { Input } from '@comp/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Inputdata() {
  const [inputData, setInputData] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/roadmap?data=${encodeURIComponent(inputData)}`);
  };

  return (
    <div className='flex items-center justify-center gap-4'>
      <Input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        className="text-white w-full px-8 py-5 bg-black border border-white/60 rounded-xl shadow-lg shadow-black/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent placeholder:text-white/60 transition-all duration-200 hover:shadow-xl hover:shadow-black/30"
        placeholder="Enter The Role"
      />
      <button onClick={handleSubmit} className='bg-blue-500/20 rounded-xl p-2'>
        <Search className='h-8 w-8 text-white/60'/>
      </button>
    </div>
  );
}