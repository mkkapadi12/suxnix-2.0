import React from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const EmptyState = ({
  icon: Icon = Package,
  title = 'No products found',
  description = 'Try adjusting your filters or search terms',
  action,
  actionLabel = 'Clear Filters',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Icon size={40} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
