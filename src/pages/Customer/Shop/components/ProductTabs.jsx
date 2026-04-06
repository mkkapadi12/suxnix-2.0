import React from 'react';
import { MessageSquare, BookOpen, AlertCircle, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProductTabs = ({ product }) => {
  if (!product) return null;

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description" className="flex items-center gap-2">
          <BookOpen size={16} />
          <span className="hidden sm:inline">Description</span>
        </TabsTrigger>
        <TabsTrigger value="nutrition" className="flex items-center gap-2">
          <Award size={16} />
          <span className="hidden sm:inline">Nutrition</span>
        </TabsTrigger>
        <TabsTrigger value="ingredients" className="flex items-center gap-2">
          <AlertCircle size={16} />
          <span className="hidden sm:inline">Ingredients</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-2">
          <MessageSquare size={16} />
          <span className="hidden sm:inline">Reviews</span>
        </TabsTrigger>
      </TabsList>

      {/* Description Tab */}
      <TabsContent value="description" className="space-y-4 mt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Benefits */}
        {product.benefits && product.benefits.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex gap-2 text-gray-600 text-sm">
                  <span className="text-suxnix-primary">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Usage */}
        {product.usage && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">How to Use</h4>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">{product.usage}</p>
          </div>
        )}
      </TabsContent>

      {/* Nutrition Tab */}
      <TabsContent value="nutrition" className="space-y-4 mt-6">
        {product.nutritionFacts ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
            <p className="text-sm text-gray-600 mb-3">Serving Size: {product.servingSize}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {Object.entries(product.nutritionFacts).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-2 pr-4 font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </td>
                      <td className="py-2 text-right text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No nutrition information available</p>
        )}
      </TabsContent>

      {/* Ingredients Tab */}
      <TabsContent value="ingredients" className="space-y-4 mt-6">
        {product.ingredients ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
              <p className="text-gray-600 text-sm">{product.ingredients}</p>
            </div>

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Allergen Information</h4>
                <div className="flex flex-wrap gap-2">
                  {product.allergens.map((allergen, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50">
                      {allergen}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-red-700 mt-2">
                  May contain traces of these allergens. Always read the label.
                </p>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700">
                      ✓ {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No ingredients information available</p>
        )}
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="space-y-6 mt-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Customer Reviews</h3>
            <p className="text-gray-600">Based on {product.reviewCount || 0} reviews</p>
          </div>
          <Button className="bg-suxnix-primary hover:bg-suxnix-primary/90">
            Write a Review
          </Button>
        </div>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{product.rating || 0}</div>
            <div className="flex justify-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded ${
                    i < Math.floor(product.rating || 0)
                      ? 'bg-yellow-400'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">out of 5</p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 w-12">{stars} ⭐</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${(stars / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">12%</span>
              </div>
            ))}
          </div>
        </div>

        {/* No Reviews Yet */}
        <div className="text-center py-8">
          <p className="text-gray-600">No customer reviews yet</p>
          <p className="text-sm text-gray-500 mt-1">Be the first to review this product</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
