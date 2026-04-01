import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProducts,
  getProductStats,
} from '@/Store/features/admin/features/admin.products.slice';
import { StatCard } from '../components/StatCard';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';

const AdminProducts = () => {
  const { products, pagination, stats, loading } = useSelector(
    (state) => state.adminProducts,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductStats());
  }, [dispatch]);

  console.log(stats);

  const statsData = [
    {
      title: 'Total Products',
      value: stats?.totalProducts ?? 'N/A',
      icon: ADMIN_ICONS.PACKAGE,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active Products',
      value: stats?.activeProducts ?? 'N/A',
      icon: ADMIN_ICONS.CHECKCIRCLE2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Published',
      value: stats?.publishedProducts ?? 'N/A',
      icon: ADMIN_ICONS.SHIELDCHECK,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Featured',
      value: stats?.featuredProducts ?? 'N/A',
      icon: ADMIN_ICONS.STAR,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Bestsellers',
      value: stats?.bestsellerProducts ?? 'N/A',
      icon: ADMIN_ICONS.TRENDINGUP,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Out of Stock',
      value: stats?.outOfStockProducts ?? 'N/A',
      icon: ADMIN_ICONS.ALERTCIRCLE,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      title: 'Low Stock',
      value: stats?.lowStockProducts ?? 'N/A',
      icon: ADMIN_ICONS.ALERTTRIANGLE,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#222222] normal-case tracking-tight">
          Products
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your products and their information.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} size="sm" />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
