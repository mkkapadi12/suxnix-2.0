import React from 'react';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { toast } from 'sonner';
import InputField from '@/components/form/InputField';
import { adminLoginSchema } from '../../Schema/adminLoginSchema';
import { loginAdmin } from '@/Store/features/admin/features/admin.auth.slice';

const AdminLoginForm = () => {
  const { loading, error } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Logging in...');

    try {
      const result = await dispatch(loginAdmin(data)).unwrap();

      toast.success(result.msg || 'Login successful!', {
        id: toastId,
      });

      form.reset();
      navigate('/admin/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(
        typeof error === 'string' ? error : error?.message || 'Login failed',
        { id: toastId },
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 grid-cols-1"
      >
        {/* Email */}
        <div className="">
          <InputField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your admin email"
          />
        </div>

        {/* Password */}
        <div className="">
          <InputField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <Field orientation="horizontal" className="w-auto">
            <Checkbox
              id="admin-remember-checkbox"
              name="admin-remember-checkbox"
              className="bg-white border border-[#e1e1e1]"
            />
            <Label
              htmlFor="admin-remember-checkbox"
              className="text-base text-suxnix-heading!"
            >
              Remember me
            </Label>
          </Field>
          <div className="">
            <Link
              to="/admin/forgot-password"
              className="text-base font-normal underline text-suxnix-text_primary"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Sign In Button */}
        <div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full px-4 text-lg font-semibold text-white transition-colors duration-300 rounded-full py-7 bg-suxnix-secondary hover:bg-green-700"
          >
            {loading ? 'Logging in...' : 'Admin Sign In'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
