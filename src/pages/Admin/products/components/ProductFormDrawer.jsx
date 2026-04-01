import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { X } from 'lucide-react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createProduct,
  updateProduct,
} from '@/Store/features/admin/features/admin.products.slice';

// Validation schema
const productSchema = z.object({
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

const CATEGORIES = [
  'protein',
  'vitamins',
  'pre_workout',
  'fat_burner',
  'creatine',
  'amino_acids',
  'weight_gainer',
  'other',
];

const WEIGHT_UNITS = ['g', 'kg', 'lbs', 'oz'];

const STATUSES = ['draft', 'active', 'inactive', 'archived'];

export const ProductFormDrawer = ({
  isOpen,
  onOpenChange,
  productId,
  productData,
}) => {
  const dispatch = useDispatch();
  const { formLoading, products } = useSelector((state) => state.adminProducts);
  const [selectedTab, setSelectedTab] = useState('basic');

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: productData || {
      status: 'draft',
      weight: { unit: 'g' },
    },
  });

  // Update form when productData changes
  useEffect(() => {
    if (productData) {
      reset(productData);
    }
  }, [productData, reset]);

  const onSubmit = async (data) => {
    try {
      const toastId = toast.loading(
        productId ? 'Updating product...' : 'Creating product...',
      );

      if (productId) {
        await dispatch(updateProduct({ id: productId, data })).unwrap();
        toast.success('Product updated successfully', { id: toastId });
      } else {
        await dispatch(createProduct(data)).unwrap();
        toast.success('Product created successfully', { id: toastId });
      }

      onOpenChange(false);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save product');
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-2xl">
        <DrawerHeader className="pb-4 border-b">
          <DrawerTitle className="text-lg font-semibold text-[#222222]">
            {productId ? 'Edit Product' : 'Create New Product'}
          </DrawerTitle>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto"
        >
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <div className="px-6 pt-4 border-b sticky top-0 bg-white z-10">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="basic" className="text-xs sm:text-sm">
                  Basic
                </TabsTrigger>
                <TabsTrigger value="pricing" className="text-xs sm:text-sm">
                  Pricing
                </TabsTrigger>
                <TabsTrigger value="details" className="text-xs sm:text-sm">
                  Details
                </TabsTrigger>
                <TabsTrigger value="images" className="text-xs sm:text-sm">
                  Images
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="text-xs sm:text-sm">
                  Nutrition
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Product Name *
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="e.g., Whey Protein Powder"
                      className="mt-1"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="sku" className="text-sm font-medium">
                      SKU *
                    </Label>
                    <Input
                      id="sku"
                      {...register('sku')}
                      placeholder="e.g., WHEY-1KG"
                      className="mt-1"
                    />
                    {errors.sku && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.sku.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category *
                    </Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="category" className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat
                                  .replace(/_/g, ' ')
                                  .charAt(0)
                                  .toUpperCase() + cat.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status
                    </Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="status" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="brand" className="text-sm font-medium">
                    Brand
                  </Label>
                  <Input
                    id="brand"
                    {...register('brand')}
                    placeholder="e.g., Optimum Nutrition"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="shortDescription"
                    className="text-sm font-medium"
                  >
                    Short Description
                  </Label>
                  <Textarea
                    id="shortDescription"
                    {...register('shortDescription')}
                    placeholder="Max 200 characters"
                    maxLength={200}
                    className="mt-1 resize-none"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {watch('shortDescription')?.length || 0}/200
                  </p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Full product description"
                    className="mt-1 resize-none"
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Pricing & Inventory Tab */}
              <TabsContent value="pricing" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium">
                      Price *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register('price')}
                      placeholder="0.00"
                      className="mt-1"
                    />
                    {errors.price && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="compareAtPrice"
                      className="text-sm font-medium"
                    >
                      Compare at Price
                    </Label>
                    <Input
                      id="compareAtPrice"
                      type="number"
                      step="0.01"
                      {...register('compareAtPrice')}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock" className="text-sm font-medium">
                      Stock *
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register('stock')}
                      placeholder="0"
                      className="mt-1"
                    />
                    {errors.stock && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="lowStockThreshold"
                      className="text-sm font-medium"
                    >
                      Low Stock Threshold
                    </Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      {...register('lowStockThreshold')}
                      placeholder="10"
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Product Details Tab */}
              <TabsContent value="details" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="weight.value"
                      className="text-sm font-medium"
                    >
                      Weight
                    </Label>
                    <Input
                      id="weight.value"
                      type="number"
                      {...register('weight.value')}
                      placeholder="1000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="weight.unit"
                      className="text-sm font-medium"
                    >
                      Unit
                    </Label>
                    <Controller
                      name="weight.unit"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value || 'g'}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="weight.unit" className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {WEIGHT_UNITS.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="servingSize"
                      className="text-sm font-medium"
                    >
                      Serving Size
                    </Label>
                    <Input
                      id="servingSize"
                      {...register('servingSize')}
                      placeholder="e.g., 25g"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="servingsPerContainer"
                      className="text-sm font-medium"
                    >
                      Servings per Container
                    </Label>
                    <Input
                      id="servingsPerContainer"
                      type="number"
                      {...register('servingsPerContainer')}
                      placeholder="40"
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Images & SEO Tab */}
              <TabsContent value="images" className="space-y-4 mt-0">
                <div>
                  <Label className="text-sm font-medium">Images</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Image management coming soon
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaTitle" className="text-sm font-medium">
                    Meta Title (max 60 chars)
                  </Label>
                  <Input
                    id="metaTitle"
                    {...register('metaTitle')}
                    maxLength={60}
                    placeholder="SEO title"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {watch('metaTitle')?.length || 0}/60
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="metaDescription"
                    className="text-sm font-medium"
                  >
                    Meta Description (max 160 chars)
                  </Label>
                  <Textarea
                    id="metaDescription"
                    {...register('metaDescription')}
                    maxLength={160}
                    placeholder="SEO description"
                    className="mt-1 resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {watch('metaDescription')?.length || 0}/160
                  </p>
                </div>
              </TabsContent>

              {/* Nutrition Tab */}
              <TabsContent value="nutrition" className="space-y-4 mt-0">
                <div>
                  <Label htmlFor="ingredients" className="text-sm font-medium">
                    Ingredients
                  </Label>
                  <Textarea
                    id="ingredients"
                    placeholder="List ingredients"
                    className="mt-1 resize-none"
                    rows={4}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <DrawerFooter className="border-t flex-row gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={formLoading}>
              {formLoading ? 'Saving...' : 'Save Product'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
