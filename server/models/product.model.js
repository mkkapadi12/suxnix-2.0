const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    // Core Fields
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    shortDescription: {
      type: String,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
    },

    // Categorization
    category: {
      type: String,
      enum: ['protein', 'vitamins', 'pre_workout', 'fat_burner', 'creatine', 'amino_acids', 'weight_gainer', 'other'],
      required: [true, 'Category is required'],
    },
    subCategory: {
      type: String,
      default: '',
    },
    tags: [String],
    brand: {
      type: String,
      default: 'Suxnix',
    },

    // Pricing
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative'],
    },
    currency: {
      type: String,
      default: 'INR',
    },

    // Inventory
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
    trackInventory: {
      type: Boolean,
      default: true,
    },

    // Media
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    thumbnail: String,

    // Product Details (Health-specific)
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['g', 'kg', 'lbs', 'oz'],
      },
    },
    servingSize: String,
    servingsPerContainer: Number,
    flavors: [String],
    nutritionFacts: [
      {
        nutrient: String,
        amount: String,
        dailyValue: String,
      },
    ],
    ingredients: String,
    allergens: [String],
    certifications: [String],

    // Status & Visibility
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive', 'archived'],
      default: 'draft',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },

    // SEO
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters'],
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters'],
    },
    metaKeywords: [String],

    // Ratings & Reviews
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },

    // Admin Tracking
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.compareAtPrice && this.price) {
    const discount = ((this.compareAtPrice - this.price) / this.compareAtPrice) * 100;
    return Math.round(discount);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('isInStock').get(function () {
  return this.stock > 0;
});

// Pre-save hook to generate slug
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Auto-set thumbnail from primary image
  if (this.images && this.images.length > 0) {
    const primaryImage = this.images.find((img) => img.isPrimary);
    this.thumbnail = primaryImage ? primaryImage.url : this.images[0].url;
  }

  next();
});

// Indexes for performance
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ isPublished: 1 });

const PRODUCT = mongoose.model('Product', productSchema);
module.exports = PRODUCT;
