import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/form/InputField';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { changeAdminPassword } from '@/Store/features/admin/admin.auth.slice';
import { changePasswordSchema } from '../Schema/adminProfileSchema';

const AdminChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.adminAuth);

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Changing password...');

    try {
      const result = await dispatch(
        changeAdminPassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      ).unwrap();

      toast.success('Password changed successfully!', {
        id: toastId,
      });

      form.reset();
    } catch (error) {
      toast.error(
        typeof error === 'string'
          ? error
          : error?.message || 'Failed to change password',
        { id: toastId },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          {/* Old Password */}
          <div>
            <InputField
              form={form}
              name="oldPassword"
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
            />
          </div>

          {/* New Password */}
          <div>
            <InputField
              form={form}
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <InputField
              form={form}
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
            />
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Password Tips:
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use at least 6 characters</li>
              <li>• Mix uppercase and lowercase letters</li>
              <li>• Include numbers and special characters</li>
              <li>• Avoid using personal information</li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-suxnix-secondary hover:bg-green-700 text-white rounded-full px-8 py-6"
          >
            {loading ? 'Changing...' : 'Change Password'}
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

export default AdminChangePasswordForm;
