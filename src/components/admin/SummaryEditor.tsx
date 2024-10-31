import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { images } from '../../config/images';

interface SummaryImages {
  floorPlan: string;
  exterior: string;
  interior: string;
}

export function SummaryEditor() {
  const [summaryImages, setSummaryImages] = useState<SummaryImages>(images.summary);

  const handleImageUpdate = (key: keyof SummaryImages, image: string) => {
    setSummaryImages(prev => ({
      ...prev,
      [key]: image
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Summary Images</h2>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Floor Plan Preview</h3>
          <ImageUpload
            currentImage={summaryImages.floorPlan}
            onImageSelect={(image) => handleImageUpdate('floorPlan', image)}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Exterior Preview</h3>
          <ImageUpload
            currentImage={summaryImages.exterior}
            onImageSelect={(image) => handleImageUpdate('exterior', image)}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Interior Preview</h3>
          <ImageUpload
            currentImage={summaryImages.interior}
            onImageSelect={(image) => handleImageUpdate('interior', image)}
          />
        </div>
      </div>
    </div>
  );
}