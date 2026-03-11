import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(10, 'Phone number must be at most 10 digits'),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
});
