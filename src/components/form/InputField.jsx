import React, { useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ form, name, label, placeholder, type = 'text' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold text-suxnix-heading">
            {label}
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={isPassword && showPassword ? 'text' : type}
                placeholder={placeholder}
                className="px-4 py-6 border border-gray-300 rounded-[5px] sm:text-lg text-black"
              />

              {/* Eye Toggle */}
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
