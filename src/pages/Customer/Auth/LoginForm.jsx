import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from './auth.schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FormInput from '../components/FormInput';
import { AUTH_ICONS } from '@/lib/icons/auth.icons';
import RHFSelect from '@/helper/RHFSelect';
import { useToast } from '@/hooks/useToast';

const LoginForm = () => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      adminToken: '',
    },
    shouldUnregister: true,
  });

  const role = useWatch({
    control,
    name: 'role',
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    showToast({
      title: 'Login Successful',
      description: data.role === 'admin' ? 'Welcome, Admin!' : 'Welcome, User!',
      type: 'success',
      icon: 'LOGIN',
    });
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-muted/40">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2 text-center">
            <AUTH_ICONS.LOGIN className="w-8 h-8 mx-auto text-suxnix-heading" />
            <h2 className="text-2xl font-bold">Login / Register</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword}
            />

            {/* Role Select */}
            <RHFSelect
              name="role"
              label="Role"
              placeholder="Select role"
              options={[
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' },
              ]}
              control={control}
              setValue={setValue}
              error={errors.role}
            />

            {/* Conditional Field */}
            {role === 'admin' && (
              <FormInput
                label="Admin token"
                name="adminToken"
                register={register}
                error={errors.adminToken}
              />
            )}

            <Button
              type="submit"
              className="w-full cursor-pointer bg-suxnix-heading hover:bg-suxnix-heading/90 text-suxnix-white"
            >
              <AUTH_ICONS.LOGIN className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
