import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist, clearWishlist } from '@/Store/features/wishlist/wishlist.slice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';

const WishlistTab = () => {
  const dispatch = useDispatch();
  const { items, totalItems, loading, error } = useSelector((state) => state.wishlist);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();
      toast({
        title: 'Success',
        description: 'Item removed from wishlist',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error || 'Failed to remove item',
        variant: 'destructive',
      });
    }
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        await dispatch(clearWishlist()).unwrap();
        toast({
          title: 'Success',
          description: 'Wishlist cleared successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error || 'Failed to clear wishlist',
          variant: 'destructive',
        });
      }
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
        <Button variant="primary">Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wishlist Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-suxnix-heading">
          {totalItems} item{totalItems !== 1 ? 's' : ''} in wishlist
        </h3>
        <Button variant="destructive" size="sm" onClick={handleClearWishlist}>
          Clear Wishlist
        </Button>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.productId} className="overflow-hidden flex flex-col">
            {/* Product Image */}
            {item.productImage && (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            )}

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col">
              {item.category && (
                <p className="text-xs text-suxnix-subtitle font-semibold mb-2">{item.category}</p>
              )}
              <h4 className="font-semibold text-suxnix-heading mb-2 line-clamp-2">
                {item.productName}
              </h4>

              {item.description && (
                <p className="text-sm text-suxnix-body line-clamp-2 mb-3">{item.description}</p>
              )}

              <p className="text-lg font-bold text-suxnix-primary mb-4">Rs. {item.price}</p>

              <p className="text-xs text-gray-500 mb-4">
                Added {new Date(item.addedAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-auto">
                <Button variant="primary" size="sm" className="w-full">
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistTab;
