import React, { useState } from 'react';
import { Heart, Share2, Minus, Plus, ShoppingCart, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 10);

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('Product is out of stock');
      return;
    }
    onAddToCart && onAddToCart(product, quantity);
    toast.success('Added to cart');
    setQuantity(1);
  };

  const handleAddToWishlist = () => {
    setIsFavorite(!isFavorite);
    onAddToWishlist && onAddToWishlist(product);
    toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.isFeatured && (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
        )}
        {product.isBestseller && (
          <Badge className="bg-purple-500 hover:bg-purple-600">Bestseller</Badge>
        )}
        {isOutOfStock && (
          <Badge className="bg-red-500 hover:bg-red-600">Out of Stock</Badge>
        )}
        {isLowStock && (
          <Badge className="bg-amber-500 hover:bg-amber-600">Low Stock</Badge>
        )}
      </div>

      {/* Product Name */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-600 text-sm mt-2">SKU: {product.sku}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.floor(product.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="font-semibold text-gray-900">{product.rating || 0}</span>
        </div>
        <p className="text-gray-600">({product.reviewCount || 0} reviews)</p>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-suxnix-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="line-through text-xl text-gray-500">
                ${product.compareAtPrice.toFixed(2)}
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Save ${(product.compareAtPrice - product.price).toFixed(2)} ({discountPercentage}%)
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
        {isOutOfStock ? (
          <>
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-700">Out of Stock</span>
          </>
        ) : isLowStock ? (
          <>
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-sm font-medium text-amber-700">Only {product.stock} left in stock</span>
          </>
        ) : (
          <>
            <Check size={18} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">In Stock ({product.stock} available)</span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="border-t" />

      {/* Product Description */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Key Details */}
      {(product.weight || product.servingSize) && (
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
          {product.weight && (
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Weight</p>
              <p className="font-semibold text-gray-900">
                {product.weight?.value}{product.weight?.unit}
              </p>
            </div>
          )}
          {product.servingSize && (
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide">Serving Size</p>
              <p className="font-semibold text-gray-900">{product.servingSize}</p>
            </div>
          )}
        </div>
      )}

      {/* Quantity Selector */}
      {!isOutOfStock && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-900">Quantity</label>
          <div className="flex items-center gap-2 w-fit border rounded-lg">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
            >
              <Minus size={16} />
            </Button>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                setQuantity(Math.min(Math.max(1, val), product.stock));
              }}
              className="w-12 text-center border-0 focus:outline-none"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex-1 bg-suxnix-primary hover:bg-suxnix-primary/90 text-white text-base py-6"
        >
          <ShoppingCart size={20} className="mr-2" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleAddToWishlist}
          className="px-6"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleShare}
          className="px-6"
        >
          <Share2 size={20} />
        </Button>
      </div>

      {/* Additional Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>Free shipping on orders over $50</p>
        <p>30-day money-back guarantee</p>
        <p>Fast & secure checkout</p>
      </div>
    </div>
  );
};

export default ProductInfo;
