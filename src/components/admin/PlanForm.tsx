import React, { useState } from 'react';
import { FloorPlan } from '../../types';
import { ImageUpload } from './ImageUpload';

interface PlanFormProps {
  plan: FloorPlan;
  onSave: (plan: FloorPlan) => void;
  onCancel: () => void;
}

export function PlanForm({ plan, onSave, onCancel }: PlanFormProps) {
  const [formData, setFormData] = useState(plan);
  const [newRoom, setNewRoom] = useState({ name: '', size: '' });

  const calculateTotalArea = (): number => {
    return Object.values(formData.dimensions).reduce((sum, size) => sum + size, 0);
  };

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.size) {
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [newRoom.name]: parseFloat(newRoom.size),
        },
      });
      setNewRoom({ name: '', size: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4">{plan.id ? 'Edit' : 'Add'} Floor Plan</h3>
        
        <div className="space-y-4">
          <ImageUpload
            currentImage={formData.image}
            onImageSelect={(image) => setFormData({ ...formData, image })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Dimensions</label>
              <span className="text-sm text-gray-500">Total: {calculateTotalArea().toFixed(1)} m²</span>
            </div>
            {Object.entries(formData.dimensions).map(([room, size]) => (
              <div key={room} className="flex items-center space-x-2 mb-2">
                <span>{room}:</span>
                <span>{size}m²</span>
                <button
                  onClick={() => {
                    const { [room]: _, ...rest } = formData.dimensions;
                    setFormData({ ...formData, dimensions: rest });
                  }}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                placeholder="Room name"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
              <input
                type="number"
                placeholder="Size (m²)"
                value={newRoom.size}
                onChange={(e) => setNewRoom({ ...newRoom, size: e.target.value })}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
              <button
                onClick={handleAddRoom}
                className="px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}