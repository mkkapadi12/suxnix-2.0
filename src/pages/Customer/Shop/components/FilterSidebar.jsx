import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = [
  'protein',
  'vitamins',
  'pre_workout',
  'fat_burner',
  'creatine',
  'amino_acids',
  'weight_gainer',
  'other',
];

const BRANDS = ['Optimum Nutrition', 'Whey Gold', 'MuscleTech', 'BSN', 'Isopure'];

export const FilterSidebar = ({ filters, onFiltersChange, isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 500]);

  const handleCategoryChange = (category, checked) => {
    onFiltersChange({
      category: checked ? category : '',
    });
  };

  const handleBrandChange = (brand, checked) => {
    const brands = filters.brand || [];
    onFiltersChange({
      brand: checked ? [...brands, brand] : brands.filter(b => b !== brand),
    });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFiltersChange({
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleFeatureChange = (feature, checked) => {
    const features = filters.features || [];
    onFiltersChange({
      features: checked ? [...features, feature] : features.filter(f => f !== feature),
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      category: '',
      minPrice: 0,
      maxPrice: 500,
      brand: [],
      features: [],
    });
    setPriceRange([0, 500]);
  };

  const hasActiveFilters =
    filters.category ||
    filters.minPrice > 0 ||
    filters.maxPrice < 500 ||
    (filters.brand?.length > 0) ||
    (filters.features?.length > 0);

  const filterContent = (
    <div className="space-y-4">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Clear All Filters
        </Button>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="text-xs">
              {filters.category}
              <X
                size={12}
                className="ml-1 cursor-pointer"
                onClick={() => handleCategoryChange(filters.category, false)}
              />
            </Badge>
          )}
          {filters.brand?.map(brand => (
            <Badge key={brand} variant="secondary" className="text-xs">
              {brand}
              <X
                size={12}
                className="ml-1 cursor-pointer"
                onClick={() => handleBrandChange(brand, false)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-semibold">Categories</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {CATEGORIES.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.category === category}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                />
                <label
                  htmlFor={category}
                  className="text-sm cursor-pointer capitalize"
                >
                  {category.replace(/_/g, ' ')}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <Slider
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold">${priceRange[0]}</span>
              <span className="text-gray-500">-</span>
              <span className="font-semibold">${priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Brands */}
      <Accordion type="single" collapsible defaultValue="brands">
        <AccordionItem value="brands">
          <AccordionTrigger className="text-sm font-semibold">Brands</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {BRANDS.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={(filters.brand || []).includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                />
                <label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Features */}
      <Accordion type="single" collapsible defaultValue="features">
        <AccordionItem value="features">
          <AccordionTrigger className="text-sm font-semibold">Features</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="featured" className="text-sm cursor-pointer">
                Featured Products
              </label>
              <Switch
                id="featured"
                checked={(filters.features || []).includes('featured')}
                onCheckedChange={(checked) => handleFeatureChange('featured', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="bestseller" className="text-sm cursor-pointer">
                Bestsellers Only
              </label>
              <Switch
                id="bestseller"
                checked={(filters.features || []).includes('bestseller')}
                onCheckedChange={(checked) => handleFeatureChange('bestseller', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="in-stock" className="text-sm cursor-pointer">
                In Stock Only
              </label>
              <Switch
                id="in-stock"
                checked={(filters.features || []).includes('in-stock')}
                onCheckedChange={(checked) => handleFeatureChange('in-stock', checked)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <Card className="p-4">
          {filterContent}
        </Card>
      </aside>

      {/* Mobile Sidebar - Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {filterContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
