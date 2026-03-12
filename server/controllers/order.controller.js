const ORDER = require('../models/order.model');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

// Get all orders for a user
const getAllOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const orders = await ORDER.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ORDER.countDocuments(query);

    return res.status(200).json({
      msg: 'Orders retrieved successfully!',
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Get single order by ID
const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    const order = await ORDER.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        msg: 'Order not found',
      });
    }

    return res.status(200).json({
      msg: 'Order retrieved successfully!',
      order,
    });
  } catch (error) {
    return next(error);
  }
};

// Create a new order
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      notes,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        msg: 'Order must contain at least one item',
      });
    }

    const orderNumber = generateOrderNumber();

    const newOrder = new ORDER({
      userId,
      orderNumber,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax: tax || 0,
      shippingCost: shippingCost || 0,
      totalAmount,
      notes: notes || '',
      status: 'Pending',
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      msg: 'Order created successfully!',
      order: savedOrder,
    });
  } catch (error) {
    return next(error);
  }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;
    const { status, trackingNumber } = req.body;

    // Only admin or user who created the order can update
    const order = await ORDER.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        msg: 'Order not found',
      });
    }

    if (status) {
      order.status = status;
    }

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    const updatedOrder = await order.save();

    return res.status(200).json({
      msg: 'Order updated successfully!',
      order: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
};

// Cancel order
const cancelOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;
    const { cancellationReason } = req.body;

    const order = await ORDER.findOne({
      _id: orderId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        msg: 'Order not found',
      });
    }

    if (order.status === 'Delivered' || order.status === 'Shipped') {
      return res.status(400).json({
        msg: 'Cannot cancel a shipped or delivered order',
      });
    }

    order.status = 'Cancelled';
    order.cancellationReason = cancellationReason || '';

    const updatedOrder = await order.save();

    return res.status(200).json({
      msg: 'Order cancelled successfully!',
      order: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder,
};
