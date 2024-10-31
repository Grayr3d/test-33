import React from 'react';
import { Info } from 'lucide-react';
import { InteriorOption } from '../types';

interface InteriorSelectorProps {
  title: string;
  options: InteriorOption[];
  selected: string;
  onSelect: (id: string) => void;
  totalPrice?: number;
}

export function InteriorSelector({ title, options, selected, onSelect, totalPrice }: InteriorSelectorProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-[20px] leading-7 font-medium">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-colors cursor-pointer"
            onClick={() => onSelect(option.id)}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                checked={selected === option.id}
                onChange={() => onSelect(option.id)}
                className="w-4 h-4 text-black focus:ring-black"
              />
              <span className="font-medium">{option.name}</span>
              <div
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: option.color }}
              />
            </div>
            <div className="flex items-center gap-4">
              {option.price > 0 && (
                <span className="font-medium">{option.price.toLocaleString()} €</span>
              )}
              <button className="text-gray-500 hover:text-black">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}