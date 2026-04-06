import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const ImageGallery = ({ images = [], productName = '' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  const mainImage = images[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <img
          src={mainImage.url}
          alt={mainImage.alt || `${productName} - image ${selectedIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Image Counter */}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Zoom Button */}
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Maximize2 size={18} />
        </Button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedIndex === index
                  ? 'border-suxnix-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={`${productName} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl w-screen h-screen p-0 bg-black/90">
          <div className="w-full h-full flex items-center justify-center relative">
            <img
              src={mainImage.url}
              alt={
                mainImage.alt || `${productName} - image ${selectedIndex + 1}`
              }
              className="max-w-full max-h-full object-contain"
            />

            {/* Close Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/10"
            >
              ✕
            </Button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handlePrevious}
                  className="absolute left-4 text-white hover:bg-white/10"
                >
                  <ChevronLeft size={24} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleNext}
                  className="absolute right-4 text-white hover:bg-white/10"
                >
                  <ChevronRight size={24} />
                </Button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
