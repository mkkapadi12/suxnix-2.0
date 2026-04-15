import z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['draft', 'active', 'inactive', 'archived']),
  brand: z.string().optional(),
  shortDescription: z.string().max(200).optional(),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be greater than 0'),
  compareAtPrice: z.coerce.number().optional(),
  stock: z.coerce.number().min(0, 'Stock cannot be negative'),
  lowStockThreshold: z.coerce.number().optional(),
  weight: z
    .object({
      value: z.coerce.number().optional(),
      unit: z.string().optional(),
    })
    .optional(),
  servingSize: z.string().optional(),
  servingsPerContainer: z.coerce.number().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
});
