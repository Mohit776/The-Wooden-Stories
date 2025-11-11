import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Filter, Grid, List, Search, X, ChevronRight } from 'lucide-react';

const Products = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('featured');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const categories = [
        { id: 'furniture', name: 'Furniture', count: 24 },
        { id: 'wall-art', name: 'Wall Art', count: 18 },
        { id: 'decor', name: 'Home Decor', count: 15 },
        { id: 'storage', name: 'Storage', count: 12 },
        { id: 'lighting', name: 'Lighting', count: 8 },
        { id: 'kitchen', name: 'Kitchenware', count: 6 }
    ];

    const products = [
        {
            id: 1,
            name: 'Walnut Wall Panel',
            category: 'wall-art',
            price: 8999,
            originalPrice: 11999,
            rating: 4.8,
            reviews: 124,
            description: 'Handcrafted walnut wood panel with intricate carving, perfect for accent walls.',
            features: ['Solid Walnut', 'Hand Carved', 'Eco-Friendly Finish'],
            images: '/Product/product-1.png',
            inStock: true,
            featured: true,
            tags: ['bestseller', 'new']
        },
        {
            id: 2,
            name: 'Teak Coffee Table',
            category: 'furniture',
            price: 24999,
            originalPrice: 29999,
            rating: 4.9,
            reviews: 89,
            description: 'Elegant teak wood coffee table with smooth finish and sturdy construction.',
            features: ['Solid Teak', 'Water Resistant', 'Easy Assembly'],
            images: '/Product/Product-2.png',
            inStock: true,
            featured: true,
            tags: ['featured', 'premium']
        },
        {
            id: 3,
            name: 'Carved Wall Accent',
            category: 'decor',
            price: 6499,
            originalPrice: 8499,
            rating: 4.7,
            reviews: 67,
            description: 'Beautiful carved wooden accent piece for wall decoration.',
            features: ['Hand Painted', 'Lightweight', 'Ready to Hang'],
            images: '/Product/Product-3.png',
            inStock: true,
            featured: false,
            tags: ['sale']
        },
        {
            id: 4,
            name: 'Oak Display Shelf',
            category: 'storage',
            price: 12999,
            originalPrice: 15999,
            rating: 4.6,
            reviews: 45,
            description: 'Modern oak wood display shelf with multiple compartments.',
            features: ['Solid Oak', 'Adjustable Shelves', 'Wall Mounted'],
            images: '/Product/product-4.png',
            inStock: false,
            featured: false,
            tags: ['out-of-stock']
        },
        {
            id: 5,
            name: 'Rosewood Side Table',
            category: 'furniture',
            price: 15999,
            originalPrice: 19999,
            rating: 4.8,
            reviews: 78,
            description: 'Compact rosewood side table with elegant design and smooth finish.',
            features: ['Solid Rosewood', 'Compact Design', 'Easy to Move'],
            images: '/Product/product-5.png',
            inStock: true,
            featured: true,
            tags: ['new']
        },
        {
            id: 6,
            name: 'Hand-carved Mirror',
            category: 'decor',
            price: 11499,
            originalPrice: 14499,
            rating: 4.5,
            reviews: 56,
            description: 'Ornate hand-carved wooden frame mirror for elegant interiors.',
            features: ['Hand Carved', 'Antique Finish', 'Safety Backing'],
            images: '/Product/product-6.png',
            inStock: true,
            featured: false,
            tags: ['sale']
        },
        {
            id: 7,
            name: 'Teakwood Bookshelf',
            category: 'storage',
            price: 18999,
            originalPrice: 22999,
            rating: 4.9,
            reviews: 92,
            description: 'Spacious teakwood bookshelf with multiple shelves and sturdy construction.',
            features: ['Solid Teak', '6 Shelves', 'Weight Capacity 50kg'],
            images: '/Product/product-7.png',
            inStock: true,
            featured: true,
            tags: ['bestseller', 'premium']
        },
        {
            id: 8,
            name: 'Wooden Wall Sculpture',
            category: 'wall-art',
            price: 7999,
            originalPrice: 9999,
            rating: 4.4,
            reviews: 34,
            description: 'Abstract wooden wall sculpture adding artistic touch to your space.',
            features: ['Abstract Design', 'Mixed Woods', 'Lightweight'],
            images: '/Product/product-8.png',
            inStock: true,
            featured: false,
            tags: ['new']
        }
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'rating': return b.rating - a.rating;
            case 'name': return a.name.localeCompare(b.name);
            default: return b.featured - a.featured;
        }
    });

    const toggleCategory = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 50000]);
        setSearchTerm('');
    };

    return (
        <div className="bg-gradient-to-br from-[#f3e9c6] via-[#f5ecd0] to-[#f3e9c6] min-h-screen">
            {/* Hero Header */}
            <div className="relative bg-gradient-to-r from-[#2c1910] via-[#3d2418] to-[#2c1910] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(211, 192, 136, 0.1) 35px, rgba(211, 192, 136, 0.1) 70px)`
                    }}></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative">
                    <div className="text-center">
                        <div className="inline-block mb-3 sm:mb-4">
                            <div className="flex items-center justify-center space-x-2 text-[#d6c088] text-xs sm:text-sm tracking-widest">
                                <span>HOME</span>
                                <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" />
                                <span className="text-[#f3e9c6]">COLLECTION</span>
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-[#f3e9c6] mb-4 sm:mb-6 tracking-tight px-4">
                            Our Collection
                        </h1>
                        <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#d6c088] to-transparent mx-auto mb-4 sm:mb-6"></div>
                        <p className="text-[#d6c088] text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
                            Discover handcrafted wooden masterpieces that bring warmth and elegance to your space
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="sticky top-16 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b-2 border-[#d6c088]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
                        {/* Search */}
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={18} />
                            <input
                                type="text"
                                placeholder="Search handcrafted pieces..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-[#d6c088]/30 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#d6c088] focus:ring-2 focus:ring-[#d6c088]/20 text-[#2c1910] transition-all duration-300 bg-[#f3e9c6]/30 text-sm sm:text-base"
                            />
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-between">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-[#2c1910] to-[#3d2418] text-[#f3e9c6] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base"
                            >
                                <Filter size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span className="hidden xs:inline">Filters</span>
                                {(selectedCategories.length > 0 || priceRange[1] < 50000) && (
                                    <span className="bg-[#d6c088] text-[#2c1910] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {selectedCategories.length + (priceRange[1] < 50000 ? 1 : 0)}
                                    </span>
                                )}
                            </button>

                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <span className="text-[#654f44] font-medium hidden sm:block text-sm">Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border-2 border-[#d6c088]/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-[#d6c088] focus:ring-2 focus:ring-[#d6c088]/20 text-[#2c1910] bg-white transition-all duration-300 font-medium cursor-pointer text-xs sm:text-sm"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="name">Name</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center border-2 border-[#d6c088]/30 rounded-lg sm:rounded-xl p-1 bg-white">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-br from-[#d6c088] to-[#c4a86f] text-[#2c1910] shadow-md' : 'text-[#654f44] hover:bg-[#f3e9c6]/50'}`}
                                >
                                    <Grid size={18} className="sm:w-5 sm:h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-br from-[#d6c088] to-[#c4a86f] text-[#2c1910] shadow-md' : 'text-[#654f44] hover:bg-[#f3e9c6]/50'}`}
                                >
                                    <List size={18} className="sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filters Panel */}
                    {showFilters && (
                        <div className="mt-6 p-6 bg-gradient-to-br from-white to-[#f3e9c6]/30 border-2 border-[#d6c088]/30 rounded-2xl lg:hidden shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-serif text-xl text-[#2c1910]">Filters</h3>
                                <button onClick={clearFilters} className="text-[#654f44] text-sm hover:text-[#2c1910] font-medium px-3 py-1 hover:bg-[#d6c088]/20 rounded-lg transition-colors">
                                    Clear All
                                </button>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-semibold text-[#2c1910] mb-3 text-sm uppercase tracking-wide">Categories</h4>
                                <div className="space-y-3">
                                    {categories.map(category => (
                                        <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => toggleCategory(category.id)}
                                                className="w-5 h-5 rounded-md border-2 border-[#d6c088] text-[#d6c088] focus:ring-2 focus:ring-[#d6c088]/50 cursor-pointer"
                                            />
                                            <span className="text-[#654f44] group-hover:text-[#2c1910] transition-colors font-medium">
                                                {category.name} <span className="text-[#d6c088]">({category.count})</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-[#2c1910] mb-3 text-sm uppercase tracking-wide">Price Range</h4>
                                <div className="space-y-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="50000"
                                        step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-[#d6c088]/30 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #d6c088 0%, #d6c088 ${(priceRange[1]/50000)*100}%, #e5d9b8 ${(priceRange[1]/50000)*100}%, #e5d9b8 100%)`
                                        }}
                                    />
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span className="text-[#2c1910] bg-[#d6c088]/20 px-3 py-1 rounded-lg">₹{priceRange[0].toLocaleString()}</span>
                                        <span className="text-[#2c1910] bg-[#d6c088]/20 px-3 py-1 rounded-lg">₹{priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden lg:block w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-48 border-2 border-[#d6c088]/20">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-2xl text-[#2c1910]">Filters</h3>
                                <button onClick={clearFilters} className="text-[#654f44] text-sm hover:text-[#2c1910] font-medium px-3 py-1 hover:bg-[#d6c088]/20 rounded-lg transition-colors">
                                    Clear All
                                </button>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-semibold text-[#2c1910] mb-4 text-sm uppercase tracking-wide">Categories</h4>
                                <div className="space-y-3">
                                    {categories.map(category => (
                                        <label key={category.id} className="flex items-center space-x-3 cursor-pointer group px-2 rounded-lg hover:bg-[#f3e9c6]/50 transition-all">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => toggleCategory(category.id)}
                                                className="w-5 h-5 rounded-md border-2 border-[#d6c088] text-[#d6c088] focus:ring-2 focus:ring-[#d6c088]/50 cursor-pointer"
                                            />
                                            <span className="text-[#654f44] group-hover:text-[#2c1910] transition-colors font-medium flex-1">
                                                {category.name}
                                            </span>
                                            <span className="text-[#d6c088] font-semibold text-sm">({category.count})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t-2 border-[#d6c088]/20">
                                <h4 className="font-semibold text-[#2c1910] mb-4 text-sm uppercase tracking-wide">Price Range</h4>
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="50000"
                                        step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-[#d6c088]/30 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #d6c088 0%, #d6c088 ${(priceRange[1]/50000)*100}%, #e5d9b8 ${(priceRange[1]/50000)*100}%, #e5d9b8 100%)`
                                        }}
                                    />
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span className="text-[#2c1910] bg-[#d6c088]/20 px-4 py-2 rounded-lg">₹{priceRange[0].toLocaleString()}</span>
                                        <span className="text-[#2c1910] bg-[#d6c088]/20 px-4 py-2 rounded-lg">₹{priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Results Count */}
                        <div className="flex justify-between items-center mb-8 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-[#d6c088]/20">
                            <p className="text-[#654f44] font-medium">
                                Showing <span className="text-[#2c1910] font-bold">{sortedProducts.length}</span> of <span className="text-[#2c1910] font-bold">{products.length}</span> products
                            </p>
                        </div>

                        {/* Products */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                                {sortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} view="grid" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {sortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} view="list" />
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {sortedProducts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-[#d6c088]/20">
                                <div className="mb-6">
                                    <div className="w-20 h-20 bg-[#f3e9c6] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search size={40} className="text-[#654f44]" />
                                    </div>
                                    <div className="text-[#2c1910] text-2xl font-serif mb-2">No products found</div>
                                    <div className="text-[#654f44] mb-6">Try adjusting your filters or search terms</div>
                                </div>
                                <button
                                    onClick={clearFilters}
                                    className="bg-gradient-to-r from-[#2c1910] to-[#3d2418] text-[#f3e9c6] px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Product Card Component
const ProductCard = ({ product, view }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    if (view === 'grid') {
        return (
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden border-2 border-transparent hover:border-[#d6c088]/30">
                {/* Image Section */}
                <div className="relative h-56 sm:h-64 md:h-72 bg-gradient-to-br from-[#654f44] to-[#4a3530] overflow-hidden">
                    <img
                        src={product.images}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Tags */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {product.tags.map(tag => (
                            <span
                                key={tag}
                                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-full shadow-lg backdrop-blur-sm ${
                                    tag === 'bestseller' ? 'bg-gradient-to-r from-[#d6c088] to-[#c4a86f] text-[#2c1910]' :
                                    tag === 'new' ? 'bg-gradient-to-r from-[#654f44] to-[#4a3530] text-[#f3e9c6]' :
                                    tag === 'sale' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
                                    tag === 'premium' ? 'bg-gradient-to-r from-[#2c1910] to-[#3d2418] text-[#d6c088]' :
                                    'bg-gray-400 text-white'
                                }`}
                            >
                                {tag === 'out-of-stock' ? 'Out of Stock' : tag.toUpperCase()}
                            </span>
                        ))}
                        {discount > 0 && (
                            <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                                {discount}% OFF
                            </span>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                    >
                        <Heart
                            size={16}
                            className={`sm:w-5 sm:h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-[#654f44]'}`}
                        />
                    </button>

                    {/* Add to Cart Button */}
                    <button className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#2c1910] to-[#3d2418] text-[#f3e9c6] px-4 sm:px-8 py-2 sm:py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex items-center space-x-2 font-medium shadow-xl hover:shadow-2xl hover:scale-105 text-xs sm:text-sm">
                        <ShoppingBag size={14} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="hidden sm:inline">Add to Cart</span>
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="flex-1 pr-2">
                            <p className="text-[#d6c088] text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1">{product.category.replace('-', ' ')}</p>
                            <h3 className="text-[#2c1910] font-serif text-base sm:text-lg md:text-xl group-hover:text-[#654f44] transition-colors">{product.name}</h3>
                        </div>
                        {product.featured && (
                            <div className="bg-gradient-to-br from-[#d6c088] to-[#c4a86f] p-1.5 sm:p-2 rounded-lg shadow-md flex-shrink-0">
                                <Star size={14} className="sm:w-[18px] sm:h-[18px] text-[#2c1910] fill-current" />
                            </div>
                        )}
                    </div>

                    <p className="text-[#654f44] text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#d6c088]/20">
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                            <div className="flex items-center space-x-1 bg-[#f3e9c6] px-1.5 sm:px-2 py-1 rounded-lg">
                                <Star size={12} className="sm:w-[14px] sm:h-[14px] text-[#d6c088] fill-current" />
                                <span className="text-[#2c1910] text-xs sm:text-sm font-bold">{product.rating}</span>
                            </div>
                            <span className="text-[#654f44] text-xs sm:text-sm">({product.reviews})</span>
                        </div>

                        <div className="text-right">
                            <div className="flex flex-col items-end">
                                {product.originalPrice > product.price && (
                                    <span className="text-[#654f44] text-[10px] sm:text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
                                )}
                                <span className="text-[#2c1910] font-serif text-base sm:text-lg md:text-xl font-bold">₹{product.price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {!product.inStock && (
                        <div className="mt-3 text-red-500 text-sm font-semibold text-center bg-red-50 py-2 rounded-lg">Out of Stock</div>
                    )}
                </div>
            </div>
        );
    }

    // List View
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden border-2 border-transparent hover:border-[#d6c088]/30">
            <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-80 h-48 sm:h-56 md:h-64 bg-gradient-to-br from-[#654f44] to-[#4a3530] relative overflow-hidden flex-shrink-0">
                    <img
                        src={product.images}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {product.tags.includes('bestseller') && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-[#d6c088] to-[#c4a86f] text-[#2c1910] text-xs font-bold rounded-full shadow-lg">BESTSELLER</span>
                        )}
                        {discount > 0 && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg">{discount}% OFF</span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col h-full">
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2 sm:mb-3">
                                <div className="flex-1 pr-2">
                                    <p className="text-[#d6c088] text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1">{product.category.replace('-', ' ')}</p>
                                    <h3 className="text-[#2c1910] font-serif text-lg sm:text-xl md:text-2xl mb-2 group-hover:text-[#654f44] transition-colors">{product.name}</h3>
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                                    {product.featured && (
                                        <div className="bg-gradient-to-br from-[#d6c088] to-[#c4a86f] p-1.5 sm:p-2 rounded-lg shadow-md">
                                            <Star size={14} className="sm:w-[18px] sm:h-[18px] text-[#2c1910] fill-current" />
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className="p-2 sm:p-3 hover:bg-[#f3e9c6] rounded-full transition-all duration-300 hover:scale-110"
                                    >
                                        <Heart
                                            size={16}
                                            className={`sm:w-5 sm:h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-[#654f44]'}`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <p className="text-[#654f44] text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed">{product.description}</p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                                {product.features.slice(0, 3).map((feature, index) => (
                                    <span key={index} className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-gradient-to-r from-[#f3e9c6] to-[#f5ecd0] text-[#654f44] text-xs sm:text-sm rounded-full font-medium border border-[#d6c088]/30 hover:border-[#d6c088] transition-colors">
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#654f44]">
                                <div className="flex items-center space-x-1.5 sm:space-x-2 bg-[#f3e9c6] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                                    <Star size={12} className="sm:w-4 sm:h-4 text-[#d6c088] fill-current" />
                                    <span className="font-bold text-[#2c1910]">{product.rating}</span>
                                    <span>({product.reviews} reviews)</span>
                                </div>
                                {!product.inStock && (
                                    <span className="text-red-500 font-semibold bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 sm:pt-6 border-t-2 border-[#d6c088]/20 mt-4 sm:mt-6 gap-4">
                            <div className="flex flex-col">
                                {product.originalPrice > product.price && (
                                    <span className="text-[#654f44] text-xs sm:text-sm line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
                                )}
                                <span className="text-[#2c1910] font-serif text-xl sm:text-2xl md:text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                <button className="border-2 border-[#2c1910] text-[#2c1910] px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-[#2c1910] hover:text-[#f3e9c6] transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg text-sm sm:text-base">
                                    View Details
                                </button>
                                <button
                                    disabled={!product.inStock}
                                    className="bg-gradient-to-r from-[#2c1910] to-[#3d2418] text-[#f3e9c6] px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium hover:scale-105 text-sm sm:text-base"
                                >
                                    <ShoppingBag size={14} className="sm:w-[18px] sm:h-[18px]" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;