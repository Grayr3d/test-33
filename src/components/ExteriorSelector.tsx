import React from 'react';
import { Info } from 'lucide-react';
import { Configuration } from '../types';

interface ExteriorSelectorProps {
  config: Configuration;
  onUpdate: (updates: Partial<Configuration>) => void;
}

export function ExteriorSelector({ config, onUpdate }: ExteriorSelectorProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-[20px] leading-7 font-medium">Facade</h3>
      <div className="space-y-2">
        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-colors cursor-pointer"
          onClick={() => onUpdate({ facade: 'black-stained' })}
        >
          <div className="flex items-center gap-4">
            <input
              type="radio"
              checked={config.facade === 'black-stained'}
              onChange={() => onUpdate({ facade: 'black-stained' })}
              className="w-4 h-4 text-black focus:ring-black"
            />
            <span className="font-medium">Black Stained</span>
            <div className="w-6 h-6 rounded-full bg-[#374151]" />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-black">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-colors cursor-pointer"
          onClick={() => onUpdate({ facade: 'natural' })}
        >
          <div className="flex items-center gap-4">
            <input
              type="radio"
              checked={config.facade === 'natural'}
              onChange={() => onUpdate({ facade: 'natural' })}
              className="w-4 h-4 text-black focus:ring-black"
            />
            <span className="font-medium">Natural</span>
            <div className="w-6 h-6 rounded-full bg-[#D4B483]" />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-black">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}