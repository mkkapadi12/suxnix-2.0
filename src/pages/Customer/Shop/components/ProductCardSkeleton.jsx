import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      {/* Image Skeleton */}
      <div className="bg-gray-100 aspect-square">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Skeleton */}
      <CardContent className="flex-1 flex flex-col justify-between p-3 space-y-2">
        {/* Category & Title */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          {/* Rating */}
          <div className="flex gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-3" />
            ))}
          </div>
        </div>

        {/* Price */}
        <Skeleton className="h-5 w-24" />

        {/* Button */}
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
