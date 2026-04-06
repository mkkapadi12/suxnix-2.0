import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trending', label: 'Trending' },
];

export const SearchSortBar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  resultCount,
  onFilterToggle,
}) => {
  const [searchValue, setSearchValue] = useState(search || '');

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearchChange(value);
    }, 500),
    [onSearchChange]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <Card className="p-4 space-y-4 lg:space-y-0">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full lg:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search products..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>

        {/* Filters Toggle (Mobile) */}
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="lg:hidden w-full lg:w-auto"
        >
          <SlidersHorizontal size={16} className="mr-2" />
          Filters
        </Button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
          <Select value={sort || 'newest'} onValueChange={onSortChange}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      {resultCount !== undefined && (
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{resultCount}</span> result{resultCount !== 1 ? 's' : ''}
        </div>
      )}
    </Card>
  );
};

export default SearchSortBar;
