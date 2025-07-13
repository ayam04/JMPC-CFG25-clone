"use client";
import { useState, useEffect } from "react";
import { isAIAvailable } from "../../configs/AImodel";

export default function AIStatusIndicator() {
  const [aiStatus, setAiStatus] = useState(null);

  useEffect(() => {
    setAiStatus(isAIAvailable());
  }, []);

  if (aiStatus === null) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg text-sm font-medium ${
      aiStatus 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    }`}>
      {aiStatus ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          AI Service Active
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          AI Service Unavailable
        </div>
      )}
    </div>
  );
}
