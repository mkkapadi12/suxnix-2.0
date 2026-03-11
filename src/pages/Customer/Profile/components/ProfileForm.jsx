import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/form/InputField';
import { updateProfile } from '@/Store/features/profile/profile.slice';
import { profileSchema } from '../schemas/profileSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProfileForm = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Updating profile...');

    try {
      const result = await dispatch(updateProfile(data)).unwrap();

      toast.success(result.msg || 'Profile updated successfully!', {
        id: toastId,
      });

      setIsEditing(false);
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : error?.message || 'Update failed',
        { id: toastId },
      );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#222222' }}>
          Personal Information
        </h2>
        <Button
          type="button"
          variant={isEditing ? 'outline' : 'default'}
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) {
              form.reset();
            }
          }}
          className={
            isEditing
              ? 'border-gray-300 text-gray-700'
              : 'bg-suxnix-primary hover:bg-amber-500'
          }
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {!isEditing ? (
        // Display Mode
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            <p className="text-lg mt-2" style={{ color: '#222222' }}>
              {user?.firstName}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Last Name
            </label>
            <p className="text-lg mt-2" style={{ color: '#222222' }}>
              {user?.lastName}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-lg mt-2" style={{ color: '#222222' }}>
              {user?.email}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Phone</label>
            <p className="text-lg mt-2" style={{ color: '#222222' }}>
              {user?.phone || 0o0}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Gender</label>
            <p className="text-lg mt-2" style={{ color: '#222222' }}>
              {user?.gender || 'Not provided'}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <p className="text-lg mt-2" style={{ color: '#222222' }}>
              {user?.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString()
                : 'Not provided'}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600">Bio</label>
            <p className="text-lg mt-2" style={{ color: '#222222' }}>
              {user?.bio || 'Not provided'}
            </p>
          </div>
        </div>
      ) : (
        // Edit Mode
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 grid-cols-1 md:grid-cols-2"
          >
            <InputField
              form={form}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
            />

            <InputField
              form={form}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
            />

            <InputField
              form={form}
              name="phone"
              label="Phone"
              type="number"
              placeholder="Enter phone number"
            />

            {/* <div>
              <label className="text-sm font-medium mb-2 block">Gender</label>
              <select
                {...form.register('gender')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-suxnix-primary"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {form.formState.errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.gender.message}
                </p>
              )}
            </div> */}

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <InputField
              form={form}
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
            />

            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Bio</label>
              <textarea
                {...form.register('bio')}
                placeholder="Tell us about yourself"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-suxnix-primary min-h-[120px]"
              />
              {form.formState.errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.bio.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-suxnix-primary hover:bg-amber-500"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ProfileForm;
