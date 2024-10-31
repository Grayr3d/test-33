import React from 'react';
import { Info } from 'lucide-react';
import { Upgrade } from '../types';

interface UpgradeSelectorProps {
  upgrades: Upgrade[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function UpgradeSelector({ upgrades, selected, onToggle }: UpgradeSelectorProps) {
  return (
    <div className="space-y-2">
      {upgrades.map((upgrade) => (
        <div
          key={upgrade.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-black transition-colors cursor-pointer"
          onClick={() => onToggle(upgrade.id)}
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={selected.includes(upgrade.id)}
              onChange={() => onToggle(upgrade.id)}
              className="w-4 h-4 rounded"
            />
            <div>
              <span className="font-medium">{upgrade.name}</span>
              <p className="text-sm text-gray-500">{upgrade.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">{upgrade.price?.toLocaleString() ?? 0}€</span>
            <button className="text-gray-500 hover:text-black">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}