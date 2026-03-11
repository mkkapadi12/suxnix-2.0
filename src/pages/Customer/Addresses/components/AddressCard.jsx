import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { deleteAddress, setDefaultAddress } from '@/Store/features/address/address.slice';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const AddressCard = ({ address, onEdit }) => {
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading('Deleting address...');

    try {
      await dispatch(deleteAddress(address._id)).unwrap();
      toast.success('Address deleted successfully!', { id: toastId });
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Failed to delete address',
        { id: toastId },
      );
    }
  };

  const handleSetDefault = async () => {
    const toastId = toast.loading('Setting as default...');

    try {
      await dispatch(setDefaultAddress(address._id)).unwrap();
      toast.success('Default address updated!', { id: toastId });
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Failed to set default address',
        { id: toastId },
      );
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Home':
        return 'bg-blue-100 text-blue-800';
      case 'Office':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: '#222222' }}>
                {address.type}
              </h3>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(address.type)}`}
              >
                {address.type}
              </span>
            </div>
            {address.isDefault && (
              <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Default Address
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-6" style={{ color: '#777777' }}>
          <p className="font-semibold text-gray-900">{address.fullName}</p>
          <p>{address.phoneNumber}</p>
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>
            {address.city}, {address.state} {address.zipCode}
          </p>
          <p>{address.country}</p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(address)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
          {!address.isDefault && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSetDefault}
              className="border-green-300 text-green-600 hover:bg-green-50 ml-auto"
            >
              Set as Default
            </Button>
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        addressType={address.type}
      />
    </>
  );
};

export default AddressCard;
