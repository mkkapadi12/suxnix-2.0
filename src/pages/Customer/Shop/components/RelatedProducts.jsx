import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getRelatedProducts } from '@/Store/features/product/product.slice';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { Button } from '@/components/ui/button';

export const RelatedProducts = ({ productId, onAddToCart, onAddToWishlist }) => {
  const dispatch = useDispatch();
  const { relatedProducts, relatedLoading } = useSelector((state) => state.product);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (productId) {
      dispatch(getRelatedProducts(productId));
    }
  }, [dispatch, productId]);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 350;
    const newPosition = scrollPosition + (direction === 'left' ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });

    setScrollPosition(newPosition);
  };

  if (relatedLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="hidden lg:flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {relatedProducts.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 snap-start"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex gap-2 lg:hidden justify-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleScroll('left')}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleScroll('right')}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;
