import React from 'react';
import { Info } from 'lucide-react';
import { FloorPlan } from '../types';

interface FloorPlanSelectorProps {
  plans: FloorPlan[];
  selectedPlan: string;
  onSelect: (id: string) => void;
}

export function FloorPlanSelector({ plans, selectedPlan, onSelect }: FloorPlanSelectorProps) {
  const currentPlan = plans.find(p => p.id === selectedPlan)!;

  return (
    <div className="space-y-2">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-colors cursor-pointer"
          onClick={() => onSelect(plan.id)}
        >
          <div className="flex items-center gap-4">
            <input
              type="radio"
              checked={selectedPlan === plan.id}
              onChange={() => onSelect(plan.id)}
              className="w-4 h-4 text-black focus:ring-black"
            />
            <span className="font-medium">{plan.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">{plan.price.toLocaleString()} €</span>
            <button className="text-gray-500 hover:text-black">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}