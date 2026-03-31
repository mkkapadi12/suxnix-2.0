import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/form/InputField';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminProfile } from '@/Store/features/admin/admin.auth.slice';
import { adminProfileSchema } from '../Schema/adminProfileSchema';

const AdminProfileForm = () => {
  const dispatch = useDispatch();
  const { admin, loading } = useSelector((state) => state.adminAuth);

  const form = useForm({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: admin?.firstName || '',
      lastName: admin?.lastName || '',
      email: admin?.email || '',
      phone: admin?.phone || '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Updating profile...');

    try {
      const result = await dispatch(updateAdminProfile(data)).unwrap();

      toast.success('Profile updated successfully!', {
        id: toastId,
      });
    } catch (error) {
      toast.error(
        typeof error === 'string'
          ? error
          : error?.message || 'Failed to update profile',
        { id: toastId },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <InputField
              form={form}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <InputField
              form={form}
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <InputField
              form={form}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed. Contact a super admin to update your email.
            </p>
          </div>

          {/* Phone */}
          <div className="md:col-span-2">
            <InputField
              form={form}
              name="phone"
              label="Phone Number (Optional)"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-suxnix-secondary hover:bg-green-700 text-white rounded-full px-8 py-6"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="px-8 py-6 rounded-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminProfileForm;
