import React, { useState } from 'react';
import { kitchenOptions, floorOptions } from '../../data/config';
import { InteriorOption } from '../../types';
import { AdminTable } from './AdminTable';
import { InteriorForm } from './InteriorForm';
import { images } from '../../config/images';

export function InteriorEditor() {
  const [options, setOptions] = useState({
    kitchen: kitchenOptions.map(option => ({
      ...option,
      image: images.interior[option.id] || images.interior.default
    })),
    floor: floorOptions.map(option => ({
      ...option,
      image: images.interior[option.id] || images.interior.default
    }))
  });
  const [editingOption, setEditingOption] = useState<{ type: 'kitchen' | 'floor'; option: InteriorOption | null }>({
    type: 'kitchen',
    option: null,
  });

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price', format: (value: number) => `${value.toLocaleString()} €` },
    { 
      key: 'color',
      label: 'Color',
      format: (value: string) => (
        <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: value }} />
      )
    },
  ];

  const handleSave = (type: 'kitchen' | 'floor', option: InteriorOption) => {
    setOptions(prev => ({
      ...prev,
      [type]: editingOption.option
        ? prev[type].map(o => o.id === option.id ? option : o)
        : [...prev[type], { ...option, id: `${type}-${prev[type].length + 1}` }],
    }));
    setEditingOption({ type, option: null });
  };

  return (
    <div className="space-y-8">
      {(['kitchen', 'floor'] as const).map(type => (
        <div key={type} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium capitalize">{type} Options</h2>
            <button
              onClick={() => setEditingOption({ 
                type,
                option: { 
                  id: '', 
                  name: '', 
                  color: '#000000', 
                  price: 0,
                  image: images.interior.default 
                }
              })}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Add Option
            </button>
          </div>

          <AdminTable
            data={options[type]}
            columns={columns}
            onEdit={(option) => setEditingOption({ type, option })}
            onDelete={(option) => setOptions(prev => ({
              ...prev,
              [type]: prev[type].filter(o => o.id !== option.id),
            }))}
          />

          {editingOption.type === type && editingOption.option && (
            <InteriorForm
              option={editingOption.option}
              onSave={(option) => handleSave(type, option)}
              onCancel={() => setEditingOption({ type, option: null })}
            />
          )}
        </div>
      ))}
    </div>
  );
}