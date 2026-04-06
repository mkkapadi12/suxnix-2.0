import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

import {
  getAllProducts,
  setFilters,
  setCurrentPage,
  resetFilters,
} from '@/Store/features/product/product.slice';
import ProductCard from './components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import FilterSidebar from './components/FilterSidebar';
import SearchSortBar from './components/SearchSortBar';
import EmptyState from './components/EmptyState';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, filters, currentPage, pagination, error } =
    useSelector((state) => state.product);

  const [filterOpen, setFilterOpen] = useState(false);

  // Sync filters from URL on mount
  useEffect(() => {
    const params = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      sortBy: searchParams.get('sort') || 'newest',
      isFeatured: searchParams.get('isFeatured') === 'true',
      isBestseller: searchParams.get('isBestseller') === 'true',
      page: parseInt(searchParams.get('page')) || 1,
    };

    if (
      params.search ||
      params.category ||
      params.isFeatured ||
      params.isBestseller
    ) {
      dispatch(setFilters(params));
      dispatch(setCurrentPage(params.page));
    }

    // Fetch products with initial params
    dispatch(getAllProducts(params));
  }, [dispatch]);

  // Debounced filter update
  const debouncedFilterUpdate = useCallback(
    debounce((newFilters) => {
      dispatch(setFilters(newFilters));
      dispatch(setCurrentPage(1));

      // Update URL params
      const params = new URLSearchParams();
      if (newFilters.search) params.set('search', newFilters.search);
      if (newFilters.category) params.set('category', newFilters.category);
      if (newFilters.sortBy && newFilters.sortBy !== 'newest')
        params.set('sort', newFilters.sortBy);
      if (newFilters.isFeatured) params.set('isFeatured', 'true');
      if (newFilters.isBestseller) params.set('isBestseller', 'true');

      setSearchParams(params.toString() ? `?${params.toString()}` : '');

      // Fetch products
      dispatch(getAllProducts({ ...newFilters, page: 1 }));
    }, 300),
    [dispatch, setSearchParams],
  );

  const handleSearchChange = (search) => {
    debouncedFilterUpdate({ ...filters, search });
  };

  const handleSortChange = (sort) => {
    debouncedFilterUpdate({ ...filters, sortBy: sort });
  };

  const handleFiltersChange = (newFilters) => {
    debouncedFilterUpdate({ ...filters, ...newFilters });
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(
      getAllProducts({
        ...filters,
        page,
      }),
    );

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
    setSearchParams('');
    dispatch(getAllProducts());
  };

  // Calculate total pages
  const totalPages = pagination?.pages || 1;
  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => currentPage - 2 + i,
  ).filter((page) => page > 0 && page <= totalPages);

  return (
    <div className="min-h-screen bg-gray-50 mt-30">
      <PageBreadcrumb crumbs={[{ label: 'Products' }]} />

      {/* Page Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Products
          </h1>
          <p className="text-gray-600 mt-2">
            Explore our comprehensive collection of health supplements and
            wellness products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Sort Bar */}
        <div className="mb-6">
          <SearchSortBar
            search={filters.search}
            onSearchChange={handleSearchChange}
            sort={filters.sortBy}
            onSortChange={handleSortChange}
            resultCount={pagination?.total || 0}
            onFilterToggle={() => setFilterOpen(!filterOpen)}
          />
        </div>

        {/* Content Layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
                <button
                  onClick={handleClearFilters}
                  className="text-red-600 hover:text-red-700 underline text-sm mt-2"
                >
                  Clear filters and try again
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your search or filters to find what you're looking for"
                action={handleClearFilters}
                actionLabel="Clear All Filters"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={(product) => {
                        // TODO: Implement add to cart
                        console.log('Add to cart:', product);
                      }}
                      onAddToWishlist={(product) => {
                        // TODO: Implement add to wishlist
                        console.log('Add to wishlist:', product);
                      }}
                      onQuickView={(product) => {
                        // TODO: Implement quick view modal
                        console.log('Quick view:', product);
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => handlePageChange(currentPage - 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}

                        {pageNumbers[0] > 1 && (
                          <>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => handlePageChange(1)}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                            {pageNumbers[0] > 2 && <PaginationEllipsis />}
                          </>
                        )}

                        {pageNumbers.map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => handlePageChange(page)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        {pageNumbers[pageNumbers.length - 1] < totalPages && (
                          <>
                            {pageNumbers[pageNumbers.length - 1] <
                              totalPages - 1 && <PaginationEllipsis />}
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => handlePageChange(totalPages)}
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}

                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => handlePageChange(currentPage + 1)}
                              className="cursor-pointer"
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
