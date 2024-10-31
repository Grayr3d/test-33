import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface ConfigurationStepProps {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

export function ConfigurationStep({ step, title, isActive, isCompleted }: ConfigurationStepProps) {
  return (
    <div className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-colors ${
      isActive ? 'bg-black text-white' : 'text-gray-500'
    }`}>
      <span className="text-sm font-medium">0{step}</span>
      <span className="text-sm font-medium">{title}</span>
      {isCompleted && <ChevronRight className="w-4 h-4 ml-auto" />}
    </div>
  );
}