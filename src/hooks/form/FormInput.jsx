import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="col-span-2 md:col-span-1">
      <Label className="block text-lg font-semibold text-suxnix-text_heading">
        {label}
      </Label>

      <Input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: `${label} is required`,
        })}
        className="block w-full px-4! py-6! mt-1 border border-gray-300 rounded-[5px] shadow-sm sm:text-lg text-black"
      />

      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormInput;
