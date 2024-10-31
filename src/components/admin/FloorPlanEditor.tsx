import React, { useState } from 'react';
import { floorPlans } from '../../data/config';
import { FloorPlan } from '../../types';
import { AdminTable } from './AdminTable';
import { PlanForm } from './PlanForm';
import { images } from '../../config/images';

export function FloorPlanEditor() {
  const [plans, setPlans] = useState<FloorPlan[]>(floorPlans);
  const [editingPlan, setEditingPlan] = useState<FloorPlan | null>(null);

  const calculateTotalArea = (dimensions: Record<string, number>): number => {
    return Object.values(dimensions).reduce((sum, size) => sum + size, 0);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price', format: (value: number) => `${value.toLocaleString()} €` },
    {
      key: 'totalArea',
      label: 'Total Area',
      format: (_: any, item: FloorPlan) => `${calculateTotalArea(item.dimensions).toFixed(1)} m²`
    },
    { 
      key: 'roomDetails',
      label: 'Room Details',
      format: (_: any, item: FloorPlan) => 
        Object.entries(item.dimensions)
          .map(([room, size]) => `${room}: ${size}m²`)
          .join(', ')
    },
  ];

  const handleSave = (plan: FloorPlan) => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === plan.id ? plan : p));
    } else {
      setPlans([...plans, { ...plan, id: `plan-${plans.length + 1}` }]);
    }
    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Floor Plans</h2>
        <button
          onClick={() => setEditingPlan({ id: '', name: '', price: 80000, dimensions: {}, image: images.floorPlan.default })}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Add Plan
        </button>
      </div>

      <AdminTable
        data={plans}
        columns={columns}
        onEdit={setEditingPlan}
        onDelete={(plan) => setPlans(plans.filter(p => p.id !== plan.id))}
      />

      {editingPlan && (
        <PlanForm
          plan={editingPlan}
          onSave={handleSave}
          onCancel={() => setEditingPlan(null)}
        />
      )}
    </div>
  );
}