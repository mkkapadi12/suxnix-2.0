import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateStock } from '@/Store/features/admin/features/admin.products.slice';

export const StockUpdateDialog = ({
  isOpen,
  onOpenChange,
  productId,
  currentStock,
  productName,
  lowStockThreshold = 10,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.adminProducts);
  const [newStock, setNewStock] = useState(currentStock || 0);

  useEffect(() => {
    setNewStock(currentStock || 0);
  }, [currentStock, isOpen]);

  const handleSave = async () => {
    try {
      const toastId = toast.loading('Updating stock...');
      
      await dispatch(updateStock({ id: productId, stock: parseInt(newStock) }));
      
      toast.success('Stock updated successfully', { id: toastId });
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update stock');
    }
  };

  const isLowStock = newStock <= lowStockThreshold;
  const isOutOfStock = newStock === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
          <DialogDescription>
            Update stock for <span className="font-semibold text-[#222222]">{productName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="newStock" className="text-sm font-medium">New Stock Quantity</Label>
            <Input
              id="newStock"
              type="number"
              min="0"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="mt-2"
            />
          </div>

          {isOutOfStock && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">⚠️ This product will be out of stock</p>
            </div>
          )}

          {isLowStock && !isOutOfStock && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-amber-700">⚠️ Low stock alert (threshold: {lowStockThreshold})</p>
            </div>
          )}

          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-700">Current stock: <span className="font-semibold">{currentStock}</span></p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Stock'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
