import React from 'react';

export const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl">
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-full border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};