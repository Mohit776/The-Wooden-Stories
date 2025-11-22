import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2, Share2, X, Star, ChevronRight } from 'lucide-react';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Walnut Wall Panel',
      category: 'Wall Art',
      price: 8999,
      originalPrice: 10999,
      rating: 4.8,
      reviews: 124,
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: 'Teak Coffee Table',
      category: 'Furniture',
      price: 24999,
      originalPrice: 24999,
      rating: 4.9,
      reviews: 89,
      inStock: true,
      featured: false
    },
    {
      id: 3,
      name: 'Carved Wall Accent',
      category: 'Decor',
      price: 6499,
      originalPrice: 7999,
      rating: 4.7,
      reviews: 156,
      inStock: false,
      featured: false
    },
    {
      id: 4,
      name: 'Oak Display Shelf',
      category: 'Storage',
      price: 12999,
      originalPrice: 12999,
      rating: 4.6,
      reviews: 78,
      inStock: true,
      featured: true
    },
    {
      id: 5,
      name: 'Mahogany Side Table',
      category: 'Furniture',
      price: 15999,
      originalPrice: 18999,
      rating: 4.8,
      reviews: 92,
      inStock: true,
      featured: false
    },
    {
      id: 6,
      name: 'Wooden Wall Mirror',
      category: 'Decor',
      price: 9999,
      originalPrice: 9999,
      rating: 4.5,
      reviews: 63,
      inStock: true,
      featured: false
    }
  ]);

  const [showShareModal, setShowShareModal] = useState(false);

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveToCart = (id) => {
    const item = wishlistItems.find(item => item.id === id);
    if (item.inStock) {
      alert(`${item.name} added to cart!`);
      removeItem(id);
    }
  };

  const calculateDiscount = (original, current) => {
    if (original > current) {
      return Math.round(((original - current) / original) * 100);
    }
    return 0;
  };

  return (
    <div className="bg-[#f3e9c6] min-h-screen">
      {/* Navigation */}
    

      {/* Hero Section */}
      <section className="bg-[#2c1910] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="h-1 w-12 sm:w-16 bg-[#d6c088] mb-4 sm:mb-6"></div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#f3e9c6] mb-2">My Wishlist</h1>
              <p className="text-[#d6c088] text-sm sm:text-base">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later</p>
            </div>
            <button
              onClick={() => setShowShareModal(true)}
              className="mt-4 sm:mt-0 bg-[#654f44] text-[#f3e9c6] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#d6c088] hover:text-[#2c1910] transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
            >
              <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Share Wishlist</span>
            </button>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
              <Heart className="mx-auto mb-4 text-[#654f44] w-16 h-16 sm:w-20 sm:h-20" size={64} />
              <h2 className="text-xl sm:text-2xl font-serif text-[#2c1910] mb-3 sm:mb-4">Your wishlist is empty</h2>
              <p className="text-[#654f44] text-sm sm:text-base mb-4 sm:mb-6">Save your favorite wooden artifacts here!</p>
              <button className="bg-[#2c1910] text-[#f3e9c6] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-[#654f44] transition-colors duration-300 text-sm sm:text-base">
                Explore Collection
              </button>
            </div>
          ) : (
            <>
              {/* Filter Bar */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center flex-wrap gap-2 sm:gap-4">
                  <span className="text-[#654f44] font-medium text-xs sm:text-sm">Filter:</span>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2c1910] text-[#f3e9c6] rounded-lg text-xs sm:text-sm">All Items</button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-[#654f44] hover:bg-[#f3e9c6] rounded-lg text-xs sm:text-sm transition-colors duration-300">In Stock</button>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-[#654f44] hover:bg-[#f3e9c6] rounded-lg text-xs sm:text-sm transition-colors duration-300">On Sale</button>
                </div>
                <button
                  onClick={() => setWishlistItems([])}
                  className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium transition-colors duration-300"
                >
                  Clear All
                </button>
              </div>

              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {wishlistItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                    style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 sm:h-56 md:h-64 bg-[#654f44] overflow-hidden">
                      <div className="w-full h-full bg-linear-to-br from-[#f3e9c6] to-[#d6c088] opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>

                      {/* Badges */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 sm:gap-2">
                        {calculateDiscount(item.originalPrice, item.price) > 0 && (
                          <span className="px-2 sm:px-3 py-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full">
                            {calculateDiscount(item.originalPrice, item.price)}% OFF
                          </span>
                        )}
                        {item.featured && (
                          <span className="px-2 sm:px-3 py-1 bg-[#d6c088] text-[#2c1910] text-[10px] sm:text-xs rounded-full">
                            Featured
                          </span>
                        )}
                        {!item.inStock && (
                          <span className="px-2 sm:px-3 py-1 bg-gray-500 text-white text-[10px] sm:text-xs rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110"
                      >
                        <X size={14} className="sm:w-[18px] sm:h-[18px] text-red-500" />
                      </button>

                      {/* Quick Actions */}
                      <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 w-full px-2 sm:px-3 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <button
                          onClick={() => moveToCart(item.id)}
                          disabled={!item.inStock}
                          className="flex-1 bg-[#2c1910] text-[#f3e9c6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#654f44] transition-colors duration-300"
                        >
                          <ShoppingBag size={12} className="sm:w-[14px] sm:h-[14px]" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 sm:p-4">
                      <div className="mb-2">
                        <p className="text-[#654f44] text-xs sm:text-sm uppercase tracking-wide">{item.category}</p>
                        <h3 className="text-[#2c1910] font-serif text-base sm:text-lg">{item.name}</h3>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="sm:w-[14px] sm:h-[14px] text-[#d6c088] fill-current" />
                          <span className="text-[#2c1910] text-xs sm:text-sm font-medium">{item.rating}</span>
                        </div>
                        <span className="text-[#654f44] text-xs sm:text-sm">({item.reviews} reviews)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          {item.originalPrice > item.price && (
                            <span className="text-[#654f44] text-xs sm:text-sm line-through">₹{item.originalPrice.toLocaleString()}</span>
                          )}
                          <span className="text-[#2c1910] font-serif text-lg sm:text-xl font-semibold">₹{item.price.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#d6c088]">
                        {item.inStock ? (
                          <p className="text-green-600 text-xs sm:text-sm font-medium">✓ In Stock</p>
                        ) : (
                          <p className="text-red-500 text-xs sm:text-sm font-medium">Out of Stock - Notify Me</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 sm:mt-12 bg-[#2c1910] rounded-lg p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-serif text-[#f3e9c6] mb-3 sm:mb-4">Ready to bring these home?</h3>
                <p className="text-[#d6c088] text-sm sm:text-base mb-4 sm:mb-6">Add your favorites to cart and complete your order</p>
                <button className="bg-[#d6c088] text-[#2c1910] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-[#f3e9c6] transition-all duration-300 flex items-center justify-center space-x-2 mx-auto group text-sm sm:text-base">
                  <span>Continue Shopping</span>
                  <ChevronRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-5 sm:p-6 relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[#654f44] hover:text-[#2c1910] transition-colors duration-300"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-serif text-[#2c1910] mb-3 sm:mb-4">Share Your Wishlist</h3>
            <p className="text-[#654f44] text-sm sm:text-base mb-4 sm:mb-6">Share your wishlist with friends and family</p>
            
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full bg-[#2c1910] text-[#f3e9c6] py-2.5 sm:py-3 rounded-lg hover:bg-[#654f44] transition-colors duration-300 text-sm sm:text-base">
                Copy Link
              </button>
              <button className="w-full border-2 border-[#2c1910] text-[#2c1910] py-2.5 sm:py-3 rounded-lg hover:bg-[#f3e9c6] transition-colors duration-300 text-sm sm:text-base">
                Share via Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
   

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}