import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/form/InputField';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdminProfile } from '@/Store/features/admin/admin.auth.slice';
import { adminProfileSchema } from '../Schema/adminProfileSchema';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const AdminProfileForm = () => {
  const dispatch = useDispatch();
  const { admin, loading } = useSelector((state) => state.adminAuth);

  const form = useForm({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  });

  useEffect(() => {
    if (admin) {
      form.reset({
        firstName: admin.firstName || '',
        lastName: admin.lastName || '',
        email: admin.email || '',
        phone: admin.phone || '',
      });
    }
  }, [admin]);

  const onSubmit = async (data) => {
    const toastId = toast.loading('Updating profile...');
    try {
      await dispatch(updateAdminProfile(data)).unwrap();
      toast.success('Profile updated successfully!', { id: toastId });
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : error?.message || 'Failed to update profile',
        { id: toastId },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField form={form} name="firstName" label="First Name" placeholder="Enter first name" />
          <InputField form={form} name="lastName" label="Last Name" placeholder="Enter last name" />
        </div>

        <div>
          <InputField
            form={form}
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter email"
            disabled
          />
          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            Email cannot be changed. Contact a super admin.
          </p>
        </div>

        <InputField
          form={form}
          name="phone"
          label="Phone Number (Optional)"
          type="tel"
          placeholder="Enter phone number"
        />

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#0d9b4d] hover:bg-[#0a7d3e] text-white px-6 py-2.5 rounded-xl font-semibold shadow-md shadow-[#0d9b4d]/30 transition-all hover:-translate-y-0.5"
          >
            <ADMIN_ICONS.SAVE size={16} />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ADMIN_ICONS.ROTATECCW size={16} />
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminProfileForm;
