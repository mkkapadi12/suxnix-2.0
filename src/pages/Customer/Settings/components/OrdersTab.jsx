import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, cancelOrder } from '@/Store/features/order/order.slice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-cyan-100 text-cyan-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
  Returned: 'bg-gray-100 text-gray-800',
};

const OrdersTab = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, pagination } = useSelector(
    (state) => state.order,
  );
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchOrders({
        status: selectedStatus,
        page: currentPage,
        limit: 10,
      }),
    );
  }, [dispatch, selectedStatus, currentPage]);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await dispatch(
          cancelOrder({
            orderId,
            reason: 'User cancelled order',
          }),
        ).unwrap();
        toast({
          title: 'Success',
          description: 'Order cancelled successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error || 'Failed to cancel order',
          variant: 'destructive',
        });
      }
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">No orders yet</p>
        <Button variant="primary">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => {
            setSelectedStatus('');
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedStatus === ''
              ? 'bg-suxnix-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(
          (status) => (
            <button
              key={status}
              onClick={() => {
                setSelectedStatus(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-suxnix-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ),
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-suxnix-heading">
                    Order {order.orderNumber}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[order.status] || statusColors.Pending
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-suxnix-body space-y-1">
                  <p>
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>Items: {order.items.length}</p>
                  <p>Total: Rs. {order.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:flex-row">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {order.status === 'Pending' || order.status === 'Processing' ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </Button>
                ) : null}
              </div>
            </div>

            {order.trackingNumber && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-suxnix-body">
                  Tracking:{' '}
                  <span className="font-semibold">{order.trackingNumber}</span>
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm">
            Page {currentPage} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === pagination.pages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
