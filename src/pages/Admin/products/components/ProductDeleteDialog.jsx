import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteProduct } from '@/Store/features/admin/features/admin.products.slice';

export const ProductDeleteDialog = ({
  isOpen,
  onOpenChange,
  productId,
  productName,
}) => {
  const dispatch = useDispatch();
  const { deleteLoading } = useSelector(state => state.adminProducts);

  const handleDelete = async () => {
    try {
      const toastId = toast.loading('Deleting product...');
      
      await dispatch(deleteProduct(productId));
      
      toast.success('Product deleted successfully', { id: toastId });
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Delete Product</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to delete <span className="font-semibold text-[#222222]">{productName}</span>? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
