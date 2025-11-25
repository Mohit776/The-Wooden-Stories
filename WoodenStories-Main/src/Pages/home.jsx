import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, Star, Shield, Truck, Heart,Loader } from 'lucide-react';
import { Link } from 'react-router';
import { BACKEND_BASE_URL, API_URL } from '../config';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [addedToCart, setAddedToCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'The Wooden Stories | Handcrafted Wooden Decor & Furniture';
    const description =
      'Discover handcrafted wooden furniture, wall art, and home decor from The Wooden Stories. Premium wooden artifacts made by artisans in India.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fixCloudinaryUrl = (url) => {
    if (!url) return url;
    url = url.replace(/\\/g, "").trim();

    if (!url.startsWith("http")) {
      const cleaned = url.replace(/^\/+/g, "");
      if (
        cleaned.includes("cloudinary.com") ||
        cleaned.includes("res.cloudinary") ||
        cleaned.includes("cloudinary")
      ) {
        return `https://${cleaned}`;
      }
    }
    return url;
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

      const transformed = data.map(product => {
        let imageUrl = "/Product/product-1.png";

        try {
          const imgs = product.images;

          if (Array.isArray(imgs)) {
            const first = imgs[0];
            if (typeof first === "string") {
              imageUrl = first.startsWith("http")
                ? first
                : first.startsWith("/")
                ? `${BACKEND_BASE_URL}${first}`
                : first;
            }
          } else if (typeof imgs === "string") {
            const trimmed = imgs.trim();

            if (trimmed.startsWith("[")) {
              const arr = JSON.parse(trimmed);
              const first = arr[0];
              if (typeof first === "string") {
                imageUrl = first.startsWith("http")
                  ? first
                  : first.startsWith("/")
                  ? `${BACKEND_BASE_URL}${first}`
                  : first;
              }
            } else if (trimmed.startsWith("http")) {
              imageUrl = trimmed;
            } else if (trimmed.startsWith("/")) {
              imageUrl = `${BACKEND_BASE_URL}${trimmed}`;
            } else {
              imageUrl = fixCloudinaryUrl(trimmed) || imageUrl;
            }
          }

          imageUrl = fixCloudinaryUrl(imageUrl) || imageUrl;
        } catch (error) {
          imageUrl = "/Product/product-1.png";
        }

        return {
          id: product.id,
          name: product.title,
          category: product.category,
          rating: 4.7,
          price: `₹${parseInt(product.price).toLocaleString()}`,
          priceValue: parseFloat(product.price),
          inStock: product.stock_quantity > 0,
          featured: Math.random() > 0.5,
          image: imageUrl,
          rawImageData: product.images
        };
      });

      setProducts(transformed);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts =
    activeCategory === "all"
      ? products.slice(0, 6)
      : products.filter(p => p.category === activeCategory).slice(0, 6);

  const handleAddToCart = (product) => {
    try {
      const stored = localStorage.getItem('cartItems');
      const existing = stored ? JSON.parse(stored) : [];

      let updatedItems;
      const index = Array.isArray(existing) ? existing.findIndex(item => item.id === product.id) : -1;

      if (index !== -1) {
        updatedItems = existing.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1, image: product.image }
            : item
        );
      } else {
        updatedItems = [
          ...(Array.isArray(existing) ? existing : []),
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.priceValue,
            quantity: 1,
            inStock: product.inStock !== false,
            image: product.image,
          },
        ];
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      setAddedToCart((prev) => ({
        ...prev,
        [product.id]: true,
      }));
    } catch (err) {
      console.error('Failed to add item to cart:', err);
    }
  };

  const features = [
    { icon: Shield, title: "Premium Quality", description: "100% natural wood with expert finishing" },
    { icon: Truck, title: "Free Shipping", description: "Across India on orders above ₹5,000" },
    { icon: Star, title: "Handcrafted", description: "Each piece uniquely crafted by artisans" },
  ];

 // if (loading) return <div className="text-center py-20 text-xl text-[#2c1910]">Loading products...</div>;
   if (loading) {
        return (
            <div className="bg-linear-to-br from-[#f3e9c6] via-[#f5ecd0] to-[#f3e9c6] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-16 h-16 text-[#d6c088] animate-spin mx-auto mb-4" />
                    <p className="text-[#2c1910] text-xl font-serif">Loading Home...</p>
                </div>
            </div>
        );
    }
  if (error) return <div className="text-center py-20 text-xl text-red-600">{error}</div>;

  return (
  
       <div className="bg-[#f3e9c6] min-h-screen">

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">

            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex items-center space-x-2 text-[#654f44]">
                <div className="h-0.5 w-6 sm:w-8 bg-[#654f44]"></div>
                <span className="text-sm sm:text-lg uppercase tracking-widest">Since 2018</span>
              </div>

              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2c1910] leading-tight">
                Crafted Stories
                <span className="block text-[#654f44] mt-1 sm:mt-2">In Wood</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#654f44] max-w-md leading-relaxed">
                Transform your living spaces with handcrafted wooden artifacts that tell timeless stories of craftsmanship and elegance.
              </p>

              <div className="flex flex-row sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-0">
                <button className="group rounded-xl bg-[#2c1910] text-[#f3e9c6] px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center space-x-2 hover:bg-[#654f44] transition-all duration-300 transform hover:scale-105 shadow-lg text-xs sm:text-base">
                  <Link to={"/products"}>Explore Collection</Link>
                  <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </button>

                <Link to={"/contact"} className="border-2 rounded-xl border-[#2c1910] text-[#2c1910] px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-[#2c1910] hover:text-[#f3e9c6] transition-all text-center text-xs sm:text-base">
                  Book Consultation
                </Link>
              </div>
            </div>

            <div className="relative group mt-6 sm:mt-8 md:mt-0">
              <div className="bg-[#2c1910] h-56 sm:h-64 md:h-80 lg:h-96 w-full transform group-hover:scale-105 transition-transform duration-700 shadow-2xl overflow-hidden">
                <img src='/hero.jpg' className="absolute w-full h-full object-cover" alt="Wooden craftsmanship" />
              </div>
              <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-6 -left-3 sm:-left-4 md:-left-6 bg-[#d6c088] h-56 sm:h-64 md:h-80 lg:h-96 w-full -z-10 transform group-hover:-translate-y-2 transition-transform duration-500"></div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10 sm:py-12 md:py-16 bg-[#2c1910]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

            {features.map((feature, i) => (
              <div key={i} className="text-center group hover:scale-105 transition-all py-4 sm:py-2">
                <div className="bg-[#654f44] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#d6c088] transition-colors">
                  <feature.icon className="text-[#f3e9c6]" size={24} />
                </div>
                <h3 className="text-[#f3e9c6] font-serif text-lg sm:text-xl">{feature.title}</h3>
                <p className="text-[#d6c088] mt-1 sm:mt-2 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION (DYNAMIC) */}
      <section id="collection" className="py-10 sm:py-12 md:py-20 bg-[#e0ca98]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2c1910]">Featured Collection</h2>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all text-xs sm:text-sm ${activeCategory === cat
                    ? 'bg-[#2c1910] text-[#f3e9c6]'
                    : 'bg-[#654f44] text-[#f3e9c6] hover:bg-[#2c1910]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            {filteredProducts.map((product, idx) => {
              const isAdded = addedToCart[product.id];
              return (
                <div
                  key={idx}
                  className="group cursor-pointer bg-[#2c1910] rounded-lg overflow-hidden shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all"
                >
                  <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/Product/product-1.png";
                      }}
                    />

                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-[#d6c088] text-[#2c1910] px-3 py-1 rounded-full text-xs">
                        Featured
                      </div>
                    )}

                  
                  </div>

                  <div className="p-5">
                    <p className="text-[#d6c088] text-xs uppercase">{product.category}</p>
                    <h3 className="text-[#f3e9c6] font-serif text-lg mt-1">{product.name}</h3>

                    <div className="flex justify-between items-center mt-3">
                      <p className="text-[#d6c088] font-medium">{product.price}</p>

                      <div className="flex items-center space-x-1">
                        <Star className="text-[#d6c088] fill-current" size={16} />
                        <span className="text-[#f3e9c6] text-sm">{product.rating}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`mt-3 sm:mt-4 w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-300 text-xs sm:text-sm font-medium ${
                        isAdded
                          ? 'bg-green-600 text-[#f3e9c6] hover:bg-green-700'
                          : 'bg-[#d6c088] text-[#2c1910] hover:bg-[#f3e9c6]'
                      }`}
                    >
                      <ShoppingBag
                        size={14}
                        className={isAdded ? 'text-[#f3e9c6]' : 'text-[#2c1910]'}
                      />
                      <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link to={"/products"} className="border-2 rounded-xl border-[#2c1910] text-[#2c1910] hover:bg-[#2c1910] hover:text-[#f3e9c6] px-6 sm:px-8 py-2.5 sm:py-3 transition-all text-sm sm:text-base inline-block">
              View All Products
            </Link>
          </div>

        </div>
      </section>

      <section id="about" className="py-10 sm:py-12 md:py-20 bg-[#2c1910] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="h-1 w-10 sm:w-12 md:w-16 bg-[#d6c088]"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#f3e9c6]">Our Philosophy</h2>
              <p className="text-[#d6c088] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                At The Wooden Stories, we believe every piece of wood carries a unique narrative. Our artisans carefully select premium timber and transform it into functional art that enhances your living spaces.
              </p>
              <p className="text-[#d6c088] text-xs sm:text-sm md:text-base leading-relaxed">
                Each artifact is a testament to sustainable craftsmanship, blending traditional techniques with contemporary design sensibilities to create timeless pieces for modern homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Link to={"/about"} className="bg-[#d6c088] rounded-2xl text-[#2c1910] px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 hover:bg-[#f3e9c6] transition-all duration-300 transform hover:scale-105 font-medium text-xs sm:text-sm md:text-base text-center">
                  Learn More About Us
                </Link>
                <Link to={"/about"} className="border-2 rounded-2xl border-[#d6c088] text-[#d6c088] px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 hover:bg-[#d6c088] hover:text-[#2c1910] transition-all duration-300 text-xs sm:text-sm md:text-base text-center">
                  Meet Our Artisans
                </Link>
              </div>
            </div>

            {/* Enhanced Visual Section with Logo and Rotating Elements */}
            <div className="relative group mt-6 sm:mt-8 md:mt-0">
              {/* Main Logo Container */}
              <div className="relative bg-[#654f44] h-56 sm:h-64 md:h-80 lg:h-96 w-full rounded-lg transform group-hover:scale-105 transition-transform duration-700 shadow-2xl flex items-center justify-center overflow-hidden">
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

      <section className="py-10 sm:py-12 md:py-20 bg-[#e0ca98] relative overflow-hidden">
        <div className="absolute inset-0 bg-wood-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="bg-[#2c1910] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 shadow-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#f3e9c6] mb-2 sm:mb-3 md:mb-4">Stay Connected</h2>
            <p className="text-[#d6c088] mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base lg:text-lg">
              Subscribe to receive updates on new collections and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 bg-[#f3e9c6] text-[#2c1910] placeholder-[#654f44] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c088] focus:scale-105 transition-transform duration-300 text-xs sm:text-sm md:text-base"
              />
              <button className="bg-[#d6c088] text-[#2c1910] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg hover:bg-[#f3e9c6] transform hover:scale-105 transition-all duration-300 font-medium shadow-lg text-xs sm:text-sm md:text-base">
                Subscribe
              </button>
            </div>
            <p className="text-[#d6c088] text-xs sm:text-sm mt-3 sm:mt-4">
              Join 10,000+ subscribers. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
