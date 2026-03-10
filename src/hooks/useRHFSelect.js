import { useWatch } from 'react-hook-form';

export const useRHFSelect = ({ name, control, setValue }) => {
  const value = useWatch({ control, name });

  const handleChange = (newValue) => {
    setValue(name, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return {
    value: value || '',
    handleChange,
  };
};
