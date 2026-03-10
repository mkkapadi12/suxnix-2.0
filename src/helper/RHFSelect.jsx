import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useRHFSelect } from '@/hooks/useRHFSelect';

const RHFSelect = ({
  name,
  label,
  placeholder,
  options = [],
  control,
  setValue,
  error,
  className = '',
}) => {
  const { value, handleChange } = useRHFSelect({
    name,
    control,
    setValue,
  });

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className={`w-full ${className}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};

export default RHFSelect;
