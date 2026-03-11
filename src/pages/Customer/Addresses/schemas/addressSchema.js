import { z } from 'zod';

export const addressSchema = z.object({
  type: z.enum(['Home', 'Office', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid address type' }),
  }),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zipCode: z.string().min(3, 'Zip code is required'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  isDefault: z.boolean().optional(),
});
