import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import InputField from '@/components/form/InputField';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createAddress, updateAddress } from '@/Store/features/address/address.slice';
import { addressSchema } from '../schemas/addressSchema';

const AddressForm = ({ open, onOpenChange, address = null }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.address);
  const isEditMode = !!address;

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      type: 'Home',
      isDefault: false,
    },
  });

  useEffect(() => {
    if (isEditMode && address) {
      form.reset({
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        type: address.type,
        isDefault: address.isDefault,
      });
    } else if (!open) {
      form.reset();
    }
  }, [isEditMode, address, open, form]);

  const onSubmit = async (data) => {
    const toastId = toast.loading(
      isEditMode ? 'Updating address...' : 'Adding address...',
    );

    try {
      if (isEditMode) {
        await dispatch(updateAddress({ id: address._id, data })).unwrap();
        toast.success('Address updated successfully!', { id: toastId });
      } else {
        await dispatch(createAddress(data)).unwrap();
        toast.success('Address added successfully!', { id: toastId });
      }

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Operation failed',
        { id: toastId },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Address' : 'Add New Address'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 grid-cols-1 md:grid-cols-2"
          >
            {/* Type */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">
                Address Type *
              </label>
              <select
                {...form.register('type')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-suxnix-primary"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Full Name */}
            <InputField
              form={form}
              name="fullName"
              label="Full Name *"
              placeholder="Enter full name"
            />

            {/* Phone */}
            <InputField
              form={form}
              name="phoneNumber"
              label="Phone Number *"
              type="tel"
              placeholder="Enter phone number"
            />

            {/* Address Line 1 */}
            <div className="md:col-span-2">
              <InputField
                form={form}
                name="addressLine1"
                label="Address Line 1 *"
                placeholder="Enter street address"
              />
            </div>

            {/* Address Line 2 */}
            <div className="md:col-span-2">
              <InputField
                form={form}
                name="addressLine2"
                label="Address Line 2"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>

            {/* City */}
            <InputField
              form={form}
              name="city"
              label="City *"
              placeholder="Enter city"
            />

            {/* State */}
            <InputField
              form={form}
              name="state"
              label="State/Province *"
              placeholder="Enter state"
            />

            {/* Zip Code */}
            <InputField
              form={form}
              name="zipCode"
              label="Zip Code *"
              placeholder="Enter zip code"
            />

            {/* Country */}
            <InputField
              form={form}
              name="country"
              label="Country *"
              placeholder="Enter country"
            />

            {/* Set as Default */}
            <div className="md:col-span-2 flex items-center gap-3">
              <Checkbox
                id="isDefault"
                {...form.register('isDefault')}
                className="bg-white border border-gray-300"
              />
              <label
                htmlFor="isDefault"
                className="text-sm font-medium cursor-pointer"
              >
                Set as default address
              </label>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-suxnix-primary hover:bg-amber-500"
              >
                {loading
                  ? isEditMode
                    ? 'Updating...'
                    : 'Adding...'
                  : isEditMode
                    ? 'Update Address'
                    : 'Add Address'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
