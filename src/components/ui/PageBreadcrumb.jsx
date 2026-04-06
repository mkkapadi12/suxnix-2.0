import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * PageBreadcrumb — Project-themed reusable breadcrumb.
 *
 * Usage:
 * <PageBreadcrumb
 *   crumbs={[
 *     { label: 'Shop', href: '/products' },
 *     { label: 'Protein' },           // no href = current page (no link)
 *   ]}
 * />
 *
 * Props:
 * - crumbs: Array<{ label: string, href?: string }>
 *   Each item is a breadcrumb segment. The last item without an href is
 *   treated as the active (current) page.
 */
const PageBreadcrumb = ({ crumbs = [] }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 h-11 text-sm">
          {/* Home is always first */}
          <li>
            <Link
              to="/"
              className="flex cursor-pointer items-center gap-1 text-suxnix-body hover:text-suxnix-secondary transition-colors duration-200 group"
              aria-label="Home"
            >
              <Home
                size={15}
                className="text-suxnix-secondary group-hover:scale-110 transition-transform duration-200"
              />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <React.Fragment key={index}>
                {/* Separator */}
                <li aria-hidden="true">
                  <ChevronRight
                    size={14}
                    className="text-gray-300 flex-shrink-0"
                  />
                </li>

                {/* Crumb */}
                <li>
                  {crumb.href && !isLast ? (
                    <Link
                      to={crumb.href}
                      className="text-suxnix-body hover:text-suxnix-secondary transition-colors duration-200 capitalize"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current="page"
                      className="font-medium text-suxnix-heading capitalize"
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default PageBreadcrumb;
