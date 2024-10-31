import React, { useState } from 'react';
import { exteriorOptions } from '../../data/config';
import { ExteriorOption } from '../../types';
import { AdminTable } from './AdminTable';
import { ExteriorForm } from './ExteriorForm';
import { images } from '../../config/images';

export function ExteriorEditor() {
  const [options, setOptions] = useState<ExteriorOption[]>(
    exteriorOptions.map(option => ({
      ...option,
      image: images.exterior[option.id] || images.exterior.default
    }))
  );
  const [editingOption, setEditingOption] = useState<ExteriorOption | null>(null);

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

  const handleSave = (option: ExteriorOption) => {
    if (editingOption) {
      setOptions(options.map(o => o.id === option.id ? option : o));
    } else {
      setOptions([...options, { ...option, id: `exterior-${options.length + 1}` }]);
    }
    setEditingOption(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Exterior Options</h2>
        <button
          onClick={() => setEditingOption({ 
            id: '', 
            name: '', 
            color: '#000000', 
            price: 0,
            image: images.exterior.default 
          })}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Add Option
        </button>
      </div>

      <AdminTable
        data={options}
        columns={columns}
        onEdit={setEditingOption}
        onDelete={(option) => setOptions(options.filter(o => o.id !== option.id))}
      />

      {editingOption && (
        <ExteriorForm
          option={editingOption}
          onSave={handleSave}
          onCancel={() => setEditingOption(null)}
        />
      )}
    </div>
  );
}