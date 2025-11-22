import React, { useEffect } from 'react';
import { Award, Leaf, Heart, Shield, MapPin, Phone, Mail, CheckCircle, Star, Truck } from 'lucide-react';


const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Arjun Sharma',
      role: 'Master Craftsman',
      experience: '25+ years',
      specialty: 'Traditional Carving',
      image: '',
      quote: 'Every piece of wood has a soul waiting to be revealed.'
    },
    {
      name: 'Priya Patel',
      role: 'Design Director',
      experience: '12+ years',
      specialty: 'Contemporary Design',
      image: '',
      quote: 'Blending tradition with modern aesthetics is my passion.'
    },
    {
      name: 'Rohan Mehta',
      role: 'Wood Specialist',
      experience: '18+ years',
      specialty: 'Timber Selection',
      image: '',
      quote: 'The right wood choice makes all the difference.'
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'We use only ethically sourced, renewable timber from certified forests.'
    },
    {
      icon: Award,
      title: 'Master Craftsmanship',
      description: 'Each piece is handcrafted by artisans with decades of experience.'
    },
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'Our work is driven by love for wood and commitment to excellence.'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Lifetime warranty on all our products against manufacturing defects.'
    }
  ];

  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: 'Premium Quality Materials',
      description: 'We source only the finest, sustainably harvested hardwoods from certified forests, ensuring durability and beauty that lasts generations.',
      features: ['100% Natural Wood', 'Eco-Friendly Sourcing', 'Premium Timber Selection']
    },
    {
      icon: Star,
      title: 'Expert Artisan Craftsmanship',
      description: 'Each piece is meticulously handcrafted by our master artisans who bring decades of experience and traditional techniques to every creation.',
      features: ['Handcrafted Excellence', 'Traditional Techniques', 'Master Artisans']
    },
    {
      icon: Truck,
      title: 'White-Glove Delivery Service',
      description: 'Experience hassle-free delivery with our professional installation team. We handle everything from delivery to setup in your space.',
      features: ['Free Shipping Over ₹5,000', 'Professional Installation', 'Nationwide Delivery']
    },
  
  ];

  const milestones = [
    { year: '2018', event: 'Founded The Wooden Stories', description: 'Started with a small workshop in Mumbai' },
    { year: '2019', event: 'First Exhibition', description: 'Featured at National Crafts Exhibition' },
    { year: '2020', event: 'Online Presence', description: 'Launched e-commerce platform' },
    { year: '2022', event: 'International Recognition', description: 'Awarded Best Craftsmanship at Design Expo' },
    { year: '2023', event: 'Expanded Workshop', description: 'Opened new 5000 sq ft facility' }
  ];

  useEffect(() => {
    document.title = 'About Us | The Wooden Stories - Our Story & Craftsmanship';
    const description =
      'Learn about The Wooden Stories, our artisans, sustainable wood sourcing, and handcrafted wooden decor and furniture.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  return (
    <div className="bg-[#f3e9c6] min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-[#2c1910] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <div className="h-1 w-12 sm:w-16 bg-[#d6c088] mx-auto mb-4 sm:mb-6"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-[#f3e9c6] mb-4 sm:mb-6">Our Story</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#d6c088] max-w-3xl mx-auto leading-relaxed px-4">
              For generations, we've been transforming premium timber into timeless pieces that tell stories of craftsmanship, heritage, and beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="h-1 w-12 sm:w-16 bg-[#654f44] mx-auto mb-2"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2c1910] mb-2">Why Choose Us</h2>
            <p className="text-sm sm:text-base md:text-lg text-[#654f44] max-w-2xl mx-auto px-4">
              Discover what sets The Wooden Stories apart and why thousands of customers trust us for their home transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#d6c088] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <item.icon className="text-[#2c1910] w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-serif text-[#2c1910] mb-2 sm:mb-3">{item.title}</h3>
                      <p className="text-[#654f44] text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                        {item.description}
                      </p>
                      <div className="space-y-1.5 sm:space-y-2">
                        {item.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle size={14} className="sm:w-4 sm:h-4 text-[#d6c088] flex shrink-0" />
                            <span className="text-[#654f44] text-xs sm:text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-linear-to-r from-[#2c1910] to-[#654f44] h-2 w-0 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-20">
            <div className="text-center border-2 sm:border-4 border-[#d6c088] rounded-lg p-4 sm:p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2c1910] mb-1 sm:mb-2">500+</div>
              <div className="text-[#654f44] text-xs sm:text-sm uppercase tracking-wide">Happy Families</div>
            </div>
            <div className="text-center border-2 sm:border-4 border-[#d6c088] rounded-lg p-4 sm:p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2c1910] mb-1 sm:mb-2">6</div>
              <div className="text-[#654f44] text-xs sm:text-sm uppercase tracking-wide">Years of Excellence</div>
            </div>
            <div className="text-center border-2 sm:border-4 border-[#d6c088] rounded-lg p-4 sm:p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2c1910] mb-1 sm:mb-2">100%</div>
              <div className="text-[#654f44] text-xs sm:text-sm uppercase tracking-wide">Satisfaction Rate</div>
            </div>
            <div className="text-center border-2 sm:border-4 border-[#d6c088] rounded-lg p-4 sm:p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2c1910] mb-1 sm:mb-2">50+</div>
              <div className="text-[#654f44] text-xs sm:text-sm uppercase tracking-wide">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-20 bg-[#2c1910]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="h-1 w-12 sm:w-16 bg-[#d6c088] mx-auto mb-4 sm:mb-6"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#f3e9c6] mb-3 sm:mb-4">Our Values</h2>
            <p className="text-[#d6c088] text-sm sm:text-base md:text-lg">The principles that guide every piece we create</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-500"
              >
                <div className="bg-[#654f44] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#d6c088] group-hover:text-[#2c1910] transition-colors duration-300">
                  <value.icon className="text-[#f3e9c6] w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-[#f3e9c6] font-serif text-lg sm:text-xl mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-[#d6c088] text-xs sm:text-sm leading-relaxed px-2">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="h-1 w-12 sm:w-16 bg-[#654f44] mx-auto mb-4 sm:mb-6"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2c1910] mb-3 sm:mb-4">Meet Our Artisans</h2>
            <p className="text-[#654f44] text-sm sm:text-base md:text-lg">The skilled hands behind every masterpiece</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-[#2c1910] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="h-40 sm:h-48 bg-[#654f44] relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#2c1910] opacity-60"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <h3 className="text-[#f3e9c6] font-serif text-lg sm:text-xl">{member.name}</h3>
                    <p className="text-[#d6c088] text-xs sm:text-sm">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#d6c088]">Experience</span>
                    <span className="text-[#f3e9c6]">{member.experience}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#d6c088]">Specialty</span>
                    <span className="text-[#f3e9c6]">{member.specialty}</span>
                  </div>
                  <div className="pt-3 sm:pt-4 border-t border-[#654f44]">
                    <p className="text-[#d6c088] italic text-xs sm:text-sm">"{member.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
    

      {/* Contact Section */}
    <section className="py-12 sm:py-20 bg-[#f3e9c6]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
      
      {/* Left Side - Workshop Info */}
      <div className="space-y-4 sm:space-y-6">
        <div className="h-1 w-12 sm:w-16 bg-[#654f44]"></div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2c1910]">Visit Our Workshop</h2>
        <p className="text-sm sm:text-base md:text-lg text-[#654f44] leading-relaxed">
          We welcome visitors to our workshop where you can see our artisans at work, feel the texture of different woods, and discuss custom projects.
        </p>
        
        <div className="space-y-4 sm:space-y-5 pt-4 sm:pt-6">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <MapPin className="text-[#d6c088] mt-1 shrink-0" size={20} />
            <div>
              <div className="text-[#2c1910] font-medium text-sm sm:text-base">Workshop Address</div>
              <div className="text-[#654f44] text-xs sm:text-sm">123 Artisan Street, Woodcraft District, Mumbai, 400001</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 sm:space-x-4">
            <Phone className="text-[#d6c088] mt-1 shrink-0" size={20} />
            <div>
              <div className="text-[#2c1910] font-medium text-sm sm:text-base">Phone</div>
              <div className="text-[#654f44] text-xs sm:text-sm">+91 98765 43210</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 sm:space-x-4">
            <Mail className="text-[#d6c088] mt-1 shrink-0" size={20} />
            <div>
              <div className="text-[#2c1910] font-medium text-sm sm:text-base">Email</div>
              <div className="text-[#654f44] text-xs sm:text-sm">hello@woodenstories.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="rounded-xl p-5 sm:p-6 md:p-8 shadow-2xl bg-[#2c1910]">
        <h3 className="text-xl sm:text-2xl font-serif text-[#d6c088] mb-4 sm:mb-6 tracking-wide">Schedule a Visit</h3>
        <form className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input 
              type="text" 
              placeholder="First Name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#654f44] text-[#f3e9c6] placeholder-[#d6c088] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c088] transition-all duration-300 text-sm sm:text-base"
            />
            <input 
              type="text" 
              placeholder="Last Name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#654f44] text-[#f3e9c6] placeholder-[#d6c088] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c088] transition-all duration-300 text-sm sm:text-base"
            />
          </div>

          <input 
            type="email" 
            placeholder="Email Address"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#654f44] text-[#f3e9c6] placeholder-[#d6c088] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c088] transition-all duration-300 text-sm sm:text-base"
          />

          <input 
            type="tel" 
            placeholder="Phone Number"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#654f44] text-[#f3e9c6] placeholder-[#d6c088] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c088] transition-all duration-300 text-sm sm:text-base"
          />

          <textarea 
            placeholder="Tell us about your project or interests..."
            rows="4"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#654f44] text-[#f3e9c6] placeholder-[#d6c088] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6c088] transition-all duration-300 resize-none text-sm sm:text-base"
          ></textarea>

          <button 
            type="submit"
            className="w-full bg-[#d6c088] text-[#2c1910] py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base md:text-lg hover:bg-[#f3e9c6] hover:text-[#2c1910] transition-all duration-300 shadow-md"
          >
            Schedule Visit
          </button>
        </form>
      </div>

    </div>
  </div>
</section>


    </div>
  );
};

export default AboutPage;