import React from 'react';
import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../../Schema/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/Store/features/auth/user.auth.slice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Registering user...');

    try {
      const result = await dispatch(registerUser(data)).unwrap();

      toast.success(result.msg || 'Registration successful!', {
        id: toastId,
      });

      form.reset();
      navigate('/login');
    } catch (error) {
      toast.error(
        typeof error === 'string'
          ? error
          : error?.message || 'Registration failed',
        { id: toastId },
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* First Name */}
        <div className="col-span-2 md:col-span-1">
          <InputField
            form={form}
            name="firstName"
            label="First Name"
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="col-span-2 md:col-span-1">
          <InputField
            form={form}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
        </div>

        {/* Email */}
        <div className="col-span-2">
          <InputField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="col-span-2">
          <InputField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
          />
        </div>

        {/* Confirm Password */}
        <div className="col-span-2">
          <InputField
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        {/* Sign Up Button */}
        <div className="col-span-2">
          <Button
            type="submit"
            className="w-full px-4 text-lg font-semibold text-white rounded-full py-7 bg-suxnix-secondary hover:bg-suxnix-primary"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
