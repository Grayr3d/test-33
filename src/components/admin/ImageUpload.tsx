import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageSelect: (image: string) => void;
}

export function ImageUpload({ currentImage, onImageSelect }: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Image</label>
      
      <div className="flex items-start space-x-4">
        {currentImage && (
          <div className="w-32 h-32 relative rounded-lg overflow-hidden border border-gray-200">
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <label className="group relative flex justify-center items-center h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-gray-500" />
              <div className="text-sm text-gray-500">
                <span className="font-medium text-black hover:underline">
                  Upload an image
                </span>
                <p className="text-xs">PNG, JPG up to 5MB</p>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}