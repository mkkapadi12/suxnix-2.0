import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { debounce } from 'lodash';
import { Edit, Trash, MoreVertical, Plus } from 'lucide-react';

import {
  getAllProducts,
  getProductStats,
  togglePublish,
  toggleFeatured,
  toggleBestseller,
} from '@/Store/features/admin/features/admin.products.slice';
import { StatCard } from '../components/StatCard';
import { ProductFormDrawer } from './components/ProductFormDrawer';
import { ProductDeleteDialog } from './components/ProductDeleteDialog';
import { StockUpdateDialog } from './components/StockUpdateDialog';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';

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

const STATUS_BADGES = {
  draft: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-red-100 text-red-700',
  archived: 'bg-slate-100 text-slate-700',
};

const AdminProducts = () => {
  const { products, stats, loading } = useSelector(
    (state) => state.adminProducts,
  );
  const dispatch = useDispatch();

  // Form dialogs state
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filters state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [published, setPublished] = useState('all');
  const [sort, setSort] = useState('newest');

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (category !== 'all') params.category = category;
      if (status !== 'all') params.status = status;
      if (published !== 'all') params.isPublished = published === 'published';
      
      dispatch(getAllProducts(params));
    }, 400),
    [category, status, published, dispatch]
  );

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductStats());
  }, [dispatch]);

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleStockClick = (product) => {
    setSelectedProduct(product);
    setStockOpen(true);
  };

  const handleTogglePublish = async (product) => {
    try {
      await dispatch(togglePublish(product._id));
      toast.success(product.isPublished ? 'Product unpublished' : 'Product published');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleToggleFeatured = async (product) => {
    try {
      await dispatch(toggleFeatured(product._id));
      toast.success(product.isFeatured ? 'Removed from featured' : 'Added to featured');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleToggleBestseller = async (product) => {
    try {
      await dispatch(toggleBestseller(product._id));
      toast.success(product.isBestseller ? 'Removed from bestseller' : 'Added to bestseller');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const statsData = [
    {
      title: 'Total Products',
      value: stats?.totalProducts ?? 0,
      icon: ADMIN_ICONS.PACKAGE,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active',
      value: stats?.activeProducts ?? 0,
      icon: ADMIN_ICONS.CHECKCIRCLE2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Published',
      value: stats?.publishedProducts ?? 0,
      icon: ADMIN_ICONS.SHIELDCHECK,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Featured',
      value: stats?.featuredProducts ?? 0,
      icon: ADMIN_ICONS.STAR,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Bestsellers',
      value: stats?.bestsellerProducts ?? 0,
      icon: ADMIN_ICONS.TRENDINGUP,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Out of Stock',
      value: stats?.outOfStockProducts ?? 0,
      icon: ADMIN_ICONS.ALERTCIRCLE,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      title: 'Low Stock',
      value: stats?.lowStockProducts ?? 0,
      icon: ADMIN_ICONS.ALERTTRIANGLE,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#222222]">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and organize your product catalog.</p>
        </div>
        <Button onClick={handleAddProduct} className="bg-suxnix-primary hover:bg-suxnix-primary/90">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} size="sm" />
        ))}
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={published} onValueChange={setPublished}>
                <SelectTrigger>
                  <SelectValue placeholder="Published" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="unpublished">Unpublished</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price_asc">Price Low to High</SelectItem>
                  <SelectItem value="price_desc">Price High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products table */}
      <Card>
        <CardContent className="pt-0">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <ADMIN_ICONS.PACKAGE size={40} className="text-gray-300 mb-2" />
              <p className="text-gray-500 font-medium">No products found</p>
              <Button onClick={handleAddProduct} variant="ghost" className="mt-4">
                <Plus size={16} className="mr-2" />
                Create first product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-12">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Published</TableHead>
                    <TableHead className="text-center">Featured</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <ADMIN_ICONS.PACKAGE size={20} className="text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold text-[#222222]">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{product.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">${product.price}</span>
                          {product.compareAtPrice && (
                            <>
                              <span className="line-through text-gray-400 text-sm">${product.compareAtPrice}</span>
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                                {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% off
                              </span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${
                            product.stock === 0 ? 'text-red-600' : 
                            product.stock <= (product.lowStockThreshold || 10) ? 'text-amber-600' : 
                            'text-green-600'
                          }`}>
                            {product.stock}
                          </span>
                          {product.stock === 0 && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Out</span>}
                          {product.stock > 0 && product.stock <= (product.lowStockThreshold || 10) && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Low</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_BADGES[product.status] || STATUS_BADGES.draft}`}>
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={product.isPublished}
                          onCheckedChange={() => handleTogglePublish(product)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={product.isFeatured}
                          onCheckedChange={() => handleToggleFeatured(product)}
                        />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                              <Edit size={14} className="mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStockClick(product)}>
                              Update Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleToggleBestseller(product)}
                              className="flex items-center"
                            >
                              {product.isBestseller ? 'Remove from' : 'Mark as'} Bestseller
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(product)}
                              className="text-red-600"
                            >
                              <Trash size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ProductFormDrawer
        isOpen={formOpen}
        onOpenChange={setFormOpen}
        productId={selectedProduct?._id}
        productData={selectedProduct}
      />

      <ProductDeleteDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        productId={selectedProduct?._id}
        productName={selectedProduct?.name}
      />

      <StockUpdateDialog
        isOpen={stockOpen}
        onOpenChange={setStockOpen}
        productId={selectedProduct?._id}
        productName={selectedProduct?.name}
        currentStock={selectedProduct?.stock}
        lowStockThreshold={selectedProduct?.lowStockThreshold}
      />
    </div>
  );
};

export default AdminProducts;
