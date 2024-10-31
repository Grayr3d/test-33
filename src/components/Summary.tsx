import React from 'react';
import { Configuration } from '../types';
import { floorPlans, kitchenOptions, floorOptions, upgrades } from '../data/config';
import { images } from '../config/images';

interface SummaryProps {
  config: Configuration;
}

export function Summary({ config }: SummaryProps) {
  const floorPlan = floorPlans.find(p => p.id === config.floorPlan)!;
  const kitchen = kitchenOptions.find(k => k.id === config.kitchen)!;
  const floor = floorOptions.find(f => f.id === config.floor)!;
  const selectedUpgrades = upgrades.filter(u => config.upgrades.includes(u.id));
  
  const totalUpgrades = selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
  const totalPrice = config.basePrice + kitchen.price + floor.price + totalUpgrades;

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-xl font-medium mb-4">Interior</h4>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Kitchen - {kitchen.name}</span>
            <span>{kitchen.price > 0 ? `${kitchen.price}€` : ''}</span>
          </div>
          <div className="flex justify-between">
            <span>Floor - {floor.name}</span>
            <span>{floor.price > 0 ? `${floor.price}€` : ''}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-medium mb-4">Exterior</h4>
        <div className="flex justify-between">
          <span>Facade - {config.facade === 'black-stained' ? 'Black Stained' : 'Natural'}</span>
          <span></span>
        </div>
      </div>

      {selectedUpgrades.length > 0 && (
        <div>
          <h4 className="text-xl font-medium mb-4">Upgrades</h4>
          <div className="space-y-4">
            {selectedUpgrades.map(upgrade => (
              <div key={upgrade.id} className="flex justify-between">
                <span>{upgrade.name}</span>
                <span>{upgrade.price.toLocaleString()} €</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 w-1/3 bg-white">
        <div className="px-8 py-4">
          <button className="w-full h-16 flex items-center justify-between px-8 bg-black text-white hover:bg-gray-900 transition-colors rounded-lg shadow-lg">
            <span className="text-base font-medium">Get offer</span>
            <span className="text-base font-medium">{totalPrice.toLocaleString()} €</span>
          </button>
        </div>
      </div>
    </div>
  );
}