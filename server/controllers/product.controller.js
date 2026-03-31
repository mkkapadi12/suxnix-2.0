const PRODUCT = require('../models/product.model');

// Helper function to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// ============================================
// PUBLIC CONTROLLER FUNCTIONS
// ============================================

// Get all products with filtering, search, and pagination
const getAllProducts = async (req, res, next) => {
  try {
    const {
      category,
      brand,
      isFeatured,
      isBestseller,
      search,
      sort = 'newest',
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    const query = {
      status: 'active',
      isPublished: true,
    };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by brand
    if (brand) {
      query.brand = brand;
    }

    // Filter by featured
    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    // Filter by bestseller
    if (isBestseller === 'true') {
      query.isBestseller = true;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Text search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Sorting
    let sortObj = { createdAt: -1 };
    switch (sort) {
      case 'price_asc':
        sortObj = { price: 1 };
        break;
      case 'price_desc':
        sortObj = { price: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'rating':
        sortObj = { 'ratings.average': -1 };
        break;
      case 'popular':
        sortObj = { 'ratings.count': -1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const products = await PRODUCT.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await PRODUCT.countDocuments(query);

    return res.status(200).json({
      msg: 'Products retrieved successfully!',
      products,
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

// Get featured products
const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const products = await PRODUCT.find({
      isFeatured: true,
      status: 'active',
      isPublished: true,
    })
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      msg: 'Featured products retrieved successfully!',
      products,
    });
  } catch (error) {
    return next(error);
  }
};

// Get bestseller products
const getBestsellerProducts = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const products = await PRODUCT.find({
      isBestseller: true,
      status: 'active',
      isPublished: true,
    })
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    return res.status(200).json({
      msg: 'Bestseller products retrieved successfully!',
      products,
    });
  } catch (error) {
    return next(error);
  }
};

// Get products by category
const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const query = {
      category,
      status: 'active',
      isPublished: true,
    };

    const skip = (page - 1) * limit;

    const products = await PRODUCT.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await PRODUCT.countDocuments(query);

    return res.status(200).json({
      msg: `Products in category ${category} retrieved successfully!`,
      products,
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

// Get product by slug
const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await PRODUCT.findOne({
      slug,
      status: 'active',
      isPublished: true,
    });

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Product retrieved successfully!',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

// Get product by ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    // Check if product is published for public route
    if (!product.isPublished || product.status !== 'active') {
      const error = new Error('Product not available');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Product retrieved successfully!',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

// Get related products
const getRelatedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    const relatedProducts = await PRODUCT.find({
      category: product.category,
      _id: { $ne: id },
      status: 'active',
      isPublished: true,
    })
      .limit(4)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      msg: 'Related products retrieved successfully!',
      products: relatedProducts,
    });
  } catch (error) {
    return next(error);
  }
};

// ============================================
// ADMIN CONTROLLER FUNCTIONS
// ============================================

// Get all products (admin - unfiltered)
const adminGetAllProducts = async (req, res, next) => {
  try {
    const {
      category,
      status,
      isPublished,
      search,
      sort = 'newest',
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let sortObj = { createdAt: -1 };
    switch (sort) {
      case 'price_asc':
        sortObj = { price: 1 };
        break;
      case 'price_desc':
        sortObj = { price: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const products = await PRODUCT.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'email firstName lastName')
      .populate('updatedBy', 'email firstName lastName');

    const total = await PRODUCT.countDocuments(query);

    return res.status(200).json({
      msg: 'Admin products retrieved successfully!',
      products,
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

// Create product
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      sku,
      category,
      price,
      stock,
      shortDescription,
      brand,
      compareAtPrice,
      images,
      weight,
      servingSize,
      servingsPerContainer,
      flavors,
      nutritionFacts,
      ingredients,
      allergens,
      certifications,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      status,
      isPublished,
      isFeatured,
      isBestseller,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !sku ||
      !category ||
      price === undefined ||
      stock === undefined
    ) {
      const error = new Error(
        'Missing required fields: name, description, sku, category, price, stock',
      );
      error.statusCode = 400;
      return next(error);
    }

    // Check duplicate SKU
    const existingSKU = await PRODUCT.findOne({ sku });
    if (existingSKU) {
      const error = new Error('SKU already exists');
      error.statusCode = 400;
      return next(error);
    }

    const newProduct = new PRODUCT({
      name,
      description,
      sku,
      category,
      price,
      stock,
      shortDescription,
      brand,
      compareAtPrice,
      images,
      weight,
      servingSize,
      servingsPerContainer,
      flavors,
      nutritionFacts,
      ingredients,
      allergens,
      certifications,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      status: status || 'draft',
      isPublished: isPublished || false,
      isFeatured: isFeatured || false,
      isBestseller: isBestseller || false,
      createdBy: req.admin._id,
      updatedBy: req.admin._id,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      msg: 'Product created successfully!',
      product: savedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow direct status/publish changes via this endpoint
    delete updateData.status;
    delete updateData.isPublished;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    // Regenerate slug if name changed
    if (updateData.name && updateData.name !== product.name) {
      updateData.slug = generateSlug(updateData.name);
    }

    updateData.updatedBy = req.admin._id;

    const updatedProduct = await PRODUCT.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      msg: 'Product updated successfully!',
      product: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findByIdAndDelete(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Product deleted successfully!',
    });
  } catch (error) {
    return next(error);
  }
};

// Update product status
const updateProductStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      const error = new Error('Status is required');
      error.statusCode = 400;
      return next(error);
    }

    const validStatuses = ['draft', 'active', 'inactive', 'archived'];
    if (!validStatuses.includes(status)) {
      const error = new Error('Invalid status');
      error.statusCode = 400;
      return next(error);
    }

    const updatedProduct = await PRODUCT.findByIdAndUpdate(
      id,
      { status, updatedBy: req.admin._id },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Product status updated successfully!',
      product: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

// Toggle publish
const togglePublish = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    // Can only publish active products
    if (!product.isPublished && product.status !== 'active') {
      const error = new Error('Product must be active to publish');
      error.statusCode = 400;
      return next(error);
    }

    product.isPublished = !product.isPublished;
    product.updatedBy = req.admin._id;

    const updatedProduct = await product.save();

    return res.status(200).json({
      msg: 'Product publish status toggled successfully!',
      product: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

// Toggle featured
const toggleFeatured = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    product.isFeatured = !product.isFeatured;
    product.updatedBy = req.admin._id;

    const updatedProduct = await product.save();

    return res.status(200).json({
      msg: 'Product featured status toggled successfully!',
      product: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

// Toggle bestseller
const toggleBestseller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    product.isBestseller = !product.isBestseller;
    product.updatedBy = req.admin._id;

    const updatedProduct = await product.save();

    return res.status(200).json({
      msg: 'Product bestseller status toggled successfully!',
      product: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

// Update stock
const updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock === undefined || stock < 0) {
      const error = new Error('Invalid stock value');
      error.statusCode = 400;
      return next(error);
    }

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    product.stock = stock;
    product.updatedBy = req.admin._id;

    const updatedProduct = await product.save();

    const response = {
      msg: 'Product stock updated successfully!',
      product: updatedProduct,
    };

    // Add low stock warning if applicable
    if (stock <= product.lowStockThreshold) {
      response.isLowStock = true;
      response.warning = `Stock is low (${stock} units remaining)`;
    }

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

// Bulk update status
const bulkUpdateStatus = async (req, res, next) => {
  try {
    const { productIds, status } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      const error = new Error('Product IDs array is required');
      error.statusCode = 400;
      return next(error);
    }

    if (!status) {
      const error = new Error('Status is required');
      error.statusCode = 400;
      return next(error);
    }

    const result = await PRODUCT.updateMany(
      { _id: { $in: productIds } },
      { status, updatedBy: req.admin._id },
    );

    return res.status(200).json({
      msg: 'Products updated successfully!',
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return next(error);
  }
};

// Get product statistics
const getProductStats = async (req, res, next) => {
  try {
    const totalProducts = await PRODUCT.countDocuments();
    const activeProducts = await PRODUCT.countDocuments({ status: 'active' });
    const publishedProducts = await PRODUCT.countDocuments({
      isPublished: true,
    });
    const featuredProducts = await PRODUCT.countDocuments({ isFeatured: true });
    const bestsellerProducts = await PRODUCT.countDocuments({
      isBestseller: true,
    });
    const outOfStockProducts = await PRODUCT.countDocuments({ stock: 0 });
    const lowStockProducts = await PRODUCT.countDocuments({
      $expr: { $lte: ['$stock', '$lowStockThreshold'] },
      stock: { $gt: 0 },
    });

    // Count by category
    const categoryStats = await PRODUCT.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    // Count by status
    const statusStats = await PRODUCT.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = {
      totalProducts,
      activeProducts,
      publishedProducts,
      featuredProducts,
      bestsellerProducts,
      outOfStockProducts,
      lowStockProducts,
      categoryStats: categoryStats.reduce((acc, cat) => {
        acc[cat._id] = cat.count;
        return acc;
      }, {}),
      statusStats: statusStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
    };

    return res.status(200).json({
      msg: 'Product statistics retrieved successfully!',
      stats,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  // Public
  getAllProducts,
  getFeaturedProducts,
  getBestsellerProducts,
  getProductsByCategory,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
  // Admin
  adminGetAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus,
  togglePublish,
  toggleFeatured,
  toggleBestseller,
  updateStock,
  bulkUpdateStatus,
  getProductStats,
};
