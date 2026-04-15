import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const ProductCard = ({
  product,
  onQuickView,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const discountPercentage = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100,
      )
    : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock =
    product.stock > 0 && product.stock <= (product.lowStockThreshold || 10);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isOutOfStock) {
      toast.error('Product is out of stock');
      return;
    }
    onAddToCart && onAddToCart(product);
    toast.success('Added to cart');
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    onAddToWishlist && onAddToWishlist(product);
    toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    onQuickView && onQuickView(product);
  };

  return (
    <Link to={`/products/${product.slug}`} className="group h-full">
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 py-0">
        {/* Image Section */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          <img
            src={product.images[0].url || '/placeholder-product.jpg'}
            alt={product.name}
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isOutOfStock && (
              <Badge className="bg-red-500 hover:bg-red-600">
                Out of Stock
              </Badge>
            )}
            {!isOutOfStock && isLowStock && (
              <Badge className="bg-amber-500 hover:bg-amber-600">
                Low Stock
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-suxnix-primary hover:bg-suxnix-primary/90">
                -{discountPercentage}%
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-yellow-500 hover:bg-yellow-600">
                Featured
              </Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-purple-500 hover:bg-purple-600">
                Bestseller
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleQuickView}
              className="rounded-full"
            >
              <Eye size={16} className="mr-1" />
              Quick View
            </Button>
          </div>

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={handleAddToWishlist}
            className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full"
          >
            <Heart
              size={18}
              className={
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }
            />
          </Button>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 flex flex-col justify-between p-3 space-y-2">
          {/* Product Info */}
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-suxnix-primary transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mt-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-suxnix-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="line-through text-xs text-gray-500">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {!isOutOfStock && isLowStock && (
            <p className="text-xs text-amber-600 font-medium">
              Only {product.stock} left
            </p>
          )}

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="w-full bg-suxnix-primary hover:bg-suxnix-primary/90 text-white"
          >
            <ShoppingCart size={16} className="mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
