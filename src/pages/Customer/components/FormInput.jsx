import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const FormInput = ({
  label,
  type = 'text',
  register,
  name,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>

      <div className="relative">
        <Input
          id={name}
          type={isPassword && showPassword ? 'text' : type}
          {...register(name)}
          {...props}
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

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};

export default FormInput;
