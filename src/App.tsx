import React, { useState, useMemo } from 'react';
import { floorPlans, kitchenOptions, floorOptions, upgrades } from './data/config';
import { ConfigurationStep } from './components/ConfigurationStep';
import { FloorPlanSelector } from './components/FloorPlanSelector';
import { InteriorSelector } from './components/InteriorSelector';
import { ExteriorSelector } from './components/ExteriorSelector';
import { UpgradeSelector } from './components/UpgradeSelector';
import { Summary } from './components/Summary';
import { KebabMenu } from './components/KebabMenu';
import { AdminPanel } from './pages/AdminPanel';
import { Configuration } from './types';
import { images } from './config/images';

function App() {
  const [step, setStep] = useState(1);
  const [showAdmin, setShowAdmin] = useState(false);
  const [config, setConfig] = useState<Configuration>({
    floorPlan: 'plan-a',
    kitchen: 'dark-grey',
    floor: 'clear-white',
    facade: 'black-stained',
    upgrades: [],
    basePrice: floorPlans[0].price,
  });

  const totalPrice = useMemo(() => {
    const selectedKitchen = kitchenOptions.find(k => k.id === config.kitchen);
    const selectedFloor = floorOptions.find(f => f.id === config.floor);
    const selectedUpgrades = upgrades.filter(u => config.upgrades.includes(u.id));
    
    const upgradesTotal = selectedUpgrades.reduce((sum, u) => sum + u.price, 0);

    return config.basePrice + 
           (selectedKitchen?.price || 0) + 
           (selectedFloor?.price || 0) + 
           upgradesTotal;
  }, [config]);

  const getCurrentImage = () => {
    switch (step) {
      case 1:
        return images.floorPlan[config.floorPlan] || images.floorPlan.default;
      case 2:
        return images.interior[config.kitchen] || images.interior.default;
      case 3:
        return images.exterior[config.facade] || images.exterior.default;
      case 4:
        return images.exterior.default;
      case 5:
        return images.summary.floorPlan;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Floor Plan';
      case 2: return 'Interior';
      case 3: return 'Exterior';
      case 4: return 'Upgrades';
      case 5: return 'Summary';
      default: return '';
    }
  };

  if (showAdmin) {
    return (
      <div className="relative">
        <AdminPanel />
        <button
          onClick={() => setShowAdmin(false)}
          className="fixed bottom-4 left-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Back to Configurator
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex">
      <div className="w-2/3 flex-shrink-0 border-r border-gray-200 overflow-hidden bg-gray-50">
        <div className="h-20 flex border-b border-gray-200 bg-white px-8">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              className={`w-40 text-sm font-medium ${
                step === num ? 'text-black border-b-2 border-black' : 'text-gray-400'
              }`}
              onClick={() => setStep(num)}
            >
              {num.toString().padStart(2, '0')}
            </button>
          ))}
        </div>
        {getCurrentImage() && (
          <div className="h-[calc(100%-5rem)] p-20">
            <div className="h-full w-full rounded-xl overflow-hidden shadow-lg">
              <img 
                src={getCurrentImage()} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-1/3 flex flex-col">
        <div className="h-20 sticky top-0 bg-white z-10 px-20 flex items-center">
          <h2 className="text-[32px] leading-10 font-medium">{getStepTitle()}</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-20 py-20 pb-32">
          {step === 1 && (
            <FloorPlanSelector
              plans={floorPlans}
              selectedPlan={config.floorPlan}
              onSelect={(id) => setConfig(prev => ({
                ...prev,
                floorPlan: id,
                basePrice: floorPlans.find(p => p.id === id)?.price || prev.basePrice,
              }))}
            />
          )}

          {step === 2 && (
            <div className="space-y-8">
              <InteriorSelector
                title="Kitchen"
                options={kitchenOptions}
                selected={config.kitchen}
                onSelect={(id) => setConfig(prev => ({ ...prev, kitchen: id }))}
              />
              <InteriorSelector
                title="Floor"
                options={floorOptions}
                selected={config.floor}
                onSelect={(id) => setConfig(prev => ({ ...prev, floor: id }))}
              />
            </div>
          )}

          {step === 3 && (
            <ExteriorSelector
              config={config}
              onUpdate={updates => setConfig(prev => ({ ...prev, ...updates }))}
            />
          )}

          {step === 4 && (
            <UpgradeSelector
              upgrades={upgrades}
              selected={config.upgrades}
              onToggle={(id) => setConfig(prev => ({
                ...prev,
                upgrades: prev.upgrades.includes(id)
                  ? prev.upgrades.filter(u => u !== id)
                  : [...prev.upgrades, id],
              }))}
            />
          )}

          {step === 5 && (
            <Summary config={config} />
          )}
        </div>

        {step < 5 && (
          <div className="fixed bottom-0 right-0 w-1/3 bg-white">
            <div className="px-20 py-8">
              <button
                onClick={() => setStep(step + 1)}
                className="w-full h-16 flex items-center justify-between px-8 bg-black text-white hover:bg-gray-900 transition-colors rounded-lg shadow-lg"
              >
                <span className="text-base font-medium">
                  Next - {getStepTitle()}
                </span>
                <span className="text-base font-medium">{totalPrice.toLocaleString()} €</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-4">
        <KebabMenu onAdminClick={() => setShowAdmin(true)} />
      </div>
    </div>
  );
}

export default App;