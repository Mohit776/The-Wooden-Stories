import React, { useState, useEffect } from 'react';
import { ShoppingBag,ChevronRight, Star, Shield, Truck, Heart } from 'lucide-react';


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      name: 'Walnut Wall Panel',
      category: 'Wall Art',
      price: '₹8,999',
      rating: 4.8,
      featured: true,
      image: '/Product/product-1.png'
    },
    {
      name: 'Teak Coffee Table',
      category: 'Furniture',
      price: '₹24,999',
      rating: 4.9,
      featured: true,
      image: '/Product/Product-2.png'
    },
    {
      name: 'Carved Wall Accent',
      category: 'Decor',
      price: '₹6,499',
      rating: 4.7,
      featured: false,
      image: '/Product/Product-3.png'
    },
    {
      name: 'Oak Display Shelf',
      category: 'Storage',
      price: '₹12,999',
      rating: 4.6,
      featured: false,
      image: '/Product/product-4.png'
    },
    {
      name: 'Rosewood Side Table',
      category: 'Furniture',
      price: '₹15,999',
      rating: 4.8,
      featured: true,
      image: '/Product/product-5.png'
    },
    {
      name: 'Hand-carved Mirror',
      category: 'Decor',
      price: '₹11,499',
      rating: 4.5,
      featured: false,
      image: '/Product/product-6.png'
    },
    {
      name: 'Teakwood Bookshelf',
      category: 'Storage',
      price: '₹18,999',
      rating: 4.9,
      featured: true,
      image: '/Product/product-7.png'
    },
    {
      name: 'Wooden Wall Sculpture',
      category: 'Wall Art',
      price: '₹7,999',
      rating: 4.4,
      featured: false,
      image: '/Product/product-8.png'
    }
  ];

  const categories = ['all', 'Wall Art', 'Furniture', 'Decor', 'Storage'];
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  const features = [
    { icon: Shield, title: 'Premium Quality', description: '100% natural wood with expert finishing' },
    { icon: Truck, title: 'Free Shipping', description: 'Across India on orders above ₹5,000' },
    { icon: Star, title: 'Handcrafted', description: 'Each piece uniquely crafted by artisans' }
  ];

  return (
    <div className="bg-[#f3e9c6] min-h-screen">
      
     

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <div className="flex items-center space-x-2 text-[#654f44]">
                <div className="h-0.5 w-6 sm:w-8 bg-[#654f44]"></div>
                <span className="text-xs sm:text-sm uppercase tracking-widest">Since 2018</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-[#2c1910] leading-tight">
                Crafted Stories
                <span className="block text-[#654f44] mt-2">In Wood</span>
              </h1>
              <p className="text-base sm:text-lg text-[#654f44] max-w-md leading-relaxed">
                Transform your living spaces with handcrafted wooden artifacts that tell timeless stories of craftsmanship and elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="group rounded-xl sm:rounded-2xl bg-[#2c1910] text-[#f3e9c6] px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center space-x-2 hover:bg-[#654f44] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                  <span>Explore Collection</span>
                  <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </button>
                <button className="border-2 rounded-xl sm:rounded-2xl border-[#2c1910] text-[#2c1910] px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#2c1910] hover:text-[#f3e9c6] transition-all duration-300 text-sm sm:text-base">
                  Book Consultation
                </button>
              </div>
            </div>

            <div className="relative group mt-8 md:mt-0">
              <div className="bg-[#2c1910] h-64 sm:h-80 md:h-96 w-full transform group-hover:scale-105 transition-transform duration-700 shadow-2xl relative overflow-hidden">
                <img src='/hero.jpg' className="absolute w-full h-full object-cover"></img>
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-[#d6c088] h-64 sm:h-80 md:h-96 w-full -z-10 transform group-hover:-translate-y-2 transition-transform duration-500"></div>
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-[#fd681e] opacity-65 -z-10">

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-[#2c1910]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-500"
              >
                <div className="bg-[#654f44] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#d6c088] group-hover:text-[#2c1910] transition-colors duration-300">
                  <feature.icon size={24} className="sm:w-7 sm:h-7 text-[#f3e9c6]" />
                </div>
                <h3 className="text-[#f3e9c6] font-serif text-lg sm:text-xl mb-2">{feature.title}</h3>
                <p className="text-[#d6c088] text-xs sm:text-sm px-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section id="collection" className="py-12 sm:py-20 bg-[#e0ca98]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="h-1 w-12 sm:w-16 bg-[#654f44] mx-auto mb-4 sm:mb-6"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2c1910] mb-3 sm:mb-4">Featured Collection</h2>
            <p className="text-[#654f44] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              Discover our curated selection of wooden masterpieces, each telling its own unique story
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${activeCategory === category
                    ? 'bg-[#2c1910] text-[#f3e9c6]'
                    : 'bg-[#654f44] text-[#f3e9c6] hover:bg-[#2c1910]'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="group cursor-pointer bg-[#2c1910] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="relative h-56 sm:h-64 md:h-72 bg-[#654f44] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="w-full h-full bg-gradient-to from-[#f3e9c6] to-[#d6c088] opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
                  {product.featured && (
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-[#d6c088] text-[#2c1910] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="text-[#f3e9c6] hover:text-[#d6c088] transition-colors duration-300" size={18} />
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <p className="text-[#d6c088] text-xs sm:text-sm uppercase tracking-wide">{product.category}</p>
                      <h3 className="text-[#f3e9c6] text-base sm:text-lg md:text-xl font-serif mt-1">{product.name}</h3>
                    </div>
                    <button className="bg-[#654f44] hover:bg-[#d6c088] text-[#f3e9c6] hover:text-[#2c1910] p-2 rounded-full transition-all duration-300 transform hover:scale-110 flex-shrink-0">
                      <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-[#d6c088] font-medium text-base sm:text-lg">{product.price}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="text-[#d6c088] fill-current" size={14} />
                      <span className="text-[#f3e9c6] text-xs sm:text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <button className="border-2 rounded-2xl border-[#2c1910] text-[#2c1910] hover:bg-[#2c1910] hover:text-[#f3e9c6] px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
     <section id="about" className="py-12 sm:py-20 bg-[#2c1910] relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div className="space-y-4 sm:space-y-6">
        <div className="h-1 w-12 sm:w-16 bg-[#d6c088]"></div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#f3e9c6]">Our Philosophy</h2>
        <p className="text-[#d6c088] text-sm sm:text-base md:text-lg leading-relaxed">
          At The Wooden Stories, we believe every piece of wood carries a unique narrative. Our artisans carefully select premium timber and transform it into functional art that enhances your living spaces.
        </p>
        <p className="text-[#d6c088] text-sm sm:text-base leading-relaxed">
          Each artifact is a testament to sustainable craftsmanship, blending traditional techniques with contemporary design sensibilities to create timeless pieces for modern homes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <button className="bg-[#d6c088] rounded-2xl text-[#2c1910] px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#f3e9c6] transition-all duration-300 transform hover:scale-105 font-medium text-sm sm:text-base">
            Learn More About Us
          </button>
          <button className="border-2 rounded-2xl border-[#d6c088] text-[#d6c088] px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#d6c088] hover:text-[#2c1910] transition-all duration-300 text-sm sm:text-base">
            Meet Our Artisans
          </button>
        </div>
      </div>

      {/* Enhanced Visual Section with Logo and Rotating Elements */}
      <div className="relative group mt-8 md:mt-0">
        {/* Main Logo Container */}
        <div className="relative bg-[#654f44] h-64 sm:h-80 md:h-96 w-full rounded-lg transform group-hover:scale-105 transition-transform duration-700 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Central Logo */}
         <img src="/logo2.png" alt="logo" className='rounded-full h-[90%] w-[90%] object-contain' />

          {/* Rotating Elements */}
          <div className="absolute inset-0">
            {/* Floating Particles */}
            <div className="absolute inset-0">
              {/* Particle 1 */}
              <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-3 h-3 sm:w-4 sm:h-4 bg-[#d6c088] rounded-full opacity-60 animate-float-1"></div>
              {/* Particle 2 */}
              <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-3 h-3 sm:w-4 sm:h-4 bg-[#f3e9c6] rounded-full opacity-60 animate-float-2"></div>
              {/* Particle 3 */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-3 h-3 sm:w-4 sm:h-4 bg-[#d6c088] rounded-full opacity-60 animate-float-3"></div>
              {/* Particle 4 */}
              <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-3 h-3 sm:w-4 sm:h-4 bg-[#d6c088] rounded-full opacity-60 animate-float-4"></div>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="hidden sm:block absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#d6c088] border-opacity-50 rounded-tl-lg"></div>
        <div className="hidden sm:block absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#d6c088] border-opacity-50 rounded-tr-lg"></div>
        <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#d6c088] border-opacity-50 rounded-bl-lg"></div>
        <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#d6c088] border-opacity-50 rounded-br-lg"></div>
      </div>
    </div>
  </div>


</section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-20 bg-[#e0ca98] relative overflow-hidden">
        <div className="absolute inset-0 bg-wood-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="bg-[#2c1910] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f3e9c6] mb-3 sm:mb-4">Stay Connected</h2>
            <p className="text-[#d6c088] mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
              Subscribe to receive updates on new collections and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-[#f3e9c6] text-[#2c1910] placeholder-[#654f44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c088] focus:scale-105 transition-transform duration-300 text-sm sm:text-base"
              />
              <button className="bg-[#d6c088] text-[#2c1910] px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#f3e9c6] transform hover:scale-105 transition-all duration-300 font-medium shadow-lg text-sm sm:text-base">
                Subscribe
              </button>
            </div>
            <p className="text-[#d6c088] text-xs sm:text-sm mt-3 sm:mt-4">
              Join 10,000+ subscribers. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .bg-wood-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23654f44' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E");
        }



   `}</style>
    </div>
  );
}