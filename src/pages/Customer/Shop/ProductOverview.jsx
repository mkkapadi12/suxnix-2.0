import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductBySlug,
  clearCurrentProduct,
} from '@/Store/features/product/product.slice';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AlertCircle } from 'lucide-react';

import ImageGallery from './components/ImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';

const ProductOverview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, detailLoading, error } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, [slug, dispatch]);

  if (detailLoading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <Skeleton className="h-8 w-32 mb-8" />

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Image Skeleton */}
            <Skeleton className="aspect-square rounded-lg" />

            {/* Info Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="space-y-4 mb-12">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-8 mt-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageBreadcrumb
            crumbs={[
              { label: 'Products', href: '/products' },
              { label: 'Product Not Found', href: '#' },
            ]}
          />

          <div className="mt-8 flex flex-col items-center justify-center py-12">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-6 text-center max-w-sm">
              {
                'The product you are looking for does not exist or has been removed.'
              }
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/products')} variant="outline">
                Back to Products
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="bg-suxnix-primary hover:bg-suxnix-primary/90"
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return null;
  }

  // images is an array of { url, alt, isPrimary } — sort so primary is first
  const images = (currentProduct.images || [])
    .slice()
    .sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));

  return (
    <div className="min-h-screen bg-white mt-30">
      {/* Breadcrumb */}
      <PageBreadcrumb
        crumbs={[
          { label: 'Products', href: '/products' },
          {
            label: currentProduct.category,
            href: `/products?category=${currentProduct.category}`,
          },
          {
            label: currentProduct.name,
            href: `/products/${currentProduct.slug}`,
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={images} productName={currentProduct.name} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo
              product={currentProduct}
              onAddToCart={(product, quantity) => {
                // TODO: Implement add to cart
                console.log('Add to cart:', product, quantity);
              }}
              onAddToWishlist={(product) => {
                // TODO: Implement add to wishlist
                console.log('Add to wishlist:', product);
              }}
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t mb-12" />

        {/* Product Tabs */}
        <div className="mb-12">
          <ProductTabs product={currentProduct} />
        </div>

        {/* Separator */}
        <div className="border-t mb-12" />

        {/* Related Products */}
        <RelatedProducts
          productId={currentProduct._id}
          onAddToCart={(product, quantity) => {
            console.log('Add to cart:', product, quantity);
          }}
          onAddToWishlist={(product) => {
            console.log('Add to wishlist:', product);
          }}
        />
      </div>

      {/* Sticky Add to Cart Button (Mobile) */}
      {currentProduct.stock > 0 && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t shadow-lg p-4 safe-area-inset-bottom">
          <Button className="w-full bg-suxnix-primary hover:bg-suxnix-primary/90 text-white py-6 text-base">
            Add to Cart - ${currentProduct.price.toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
