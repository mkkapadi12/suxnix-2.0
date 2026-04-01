import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/form/InputField';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { changeAdminPassword } from '@/Store/features/admin/features/admin.auth.slice';
import { changePasswordSchema } from '../Schema/adminProfileSchema';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const AdminChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.adminAuth);

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Changing password...');
    try {
      await dispatch(
        changeAdminPassword({
          currentPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }),
      ).unwrap();

      toast.success('Password changed successfully!', { id: toastId });
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

  const tipItems = [
    'Use at least 6 characters',
    'Mix uppercase and lowercase letters',
    'Include numbers and special characters',
    'Avoid using personal information',
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <InputField
              form={form}
              name="oldPassword"
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
            />
          </div>
          <InputField
            form={form}
            name="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <InputField
            form={form}
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
        </div>

        {/* Security tips */}
        <div className="flex items-start gap-3 bg-[#0d9b4d]/5 border border-[#0d9b4d]/20 rounded-xl p-4">
          <ADMIN_ICONS.SHIELDCHECK
            size={18}
            className="text-[#0d9b4d] mt-0.5 shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-[#0d9b4d] mb-2">
              Password Security Tips
            </p>
            <ul className="space-y-1">
              {tipItems.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-gray-600"
                >
                  <span className="w-1 h-1 bg-[#0d9b4d] rounded-full shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#0d9b4d] hover:bg-[#0a7d3e] text-white px-6 py-2.5 rounded-xl font-semibold shadow-md shadow-[#0d9b4d]/30 transition-all hover:-translate-y-0.5"
          >
            <ADMIN_ICONS.KEYROUND size={16} />
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ADMIN_ICONS.ROTATECCW size={16} />
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminChangePasswordForm;
