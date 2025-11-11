import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[#f3e9c6] min-h-screen">
    

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 bg-[#2c1910]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-1 w-12 sm:w-16 bg-[#d6c088] mx-auto mb-4 sm:mb-6"></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#f3e9c6] mb-3 sm:mb-4">Get In Touch</h1>
          <p className="text-[#d6c088] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Have a question about our wooden artifacts? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2c1910] mb-4 sm:mb-6">Send Us a Message</h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-[#654f44] font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#d6c088] focus:border-[#654f44] focus:outline-none rounded-lg transition-colors duration-300 text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-[#654f44] font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#d6c088] focus:border-[#654f44] focus:outline-none rounded-lg transition-colors duration-300 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#654f44] font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#d6c088] focus:border-[#654f44] focus:outline-none rounded-lg transition-colors duration-300 text-sm sm:text-base"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-[#654f44] font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#d6c088] focus:border-[#654f44] focus:outline-none rounded-lg transition-colors duration-300 text-sm sm:text-base"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-[#654f44] font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#d6c088] focus:border-[#654f44] focus:outline-none rounded-lg transition-colors duration-300 resize-none text-sm sm:text-base"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#2c1910] text-[#f3e9c6] py-3 sm:py-4 rounded-lg hover:bg-[#654f44] transition-all duration-300 flex items-center justify-center space-x-2 group text-sm sm:text-base"
                >
                  <span>Send Message</span>
                  <Send size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8 mt-8 md:mt-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#2c1910] mb-4 sm:mb-6">Contact Information</h2>
                <p className="text-[#654f44] text-sm sm:text-base mb-6 sm:mb-8">
                  Reach out to us through any of these channels. We're here to help you find the perfect wooden pieces for your home.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-[#2c1910] p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="text-[#d6c088] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#2c1910] font-serif text-base sm:text-lg mb-1">Visit Us</h3>
                    <p className="text-[#654f44] text-xs sm:text-sm">
                      123 Artisan Street<br />
                      Heritage Market, Faridabad<br />
                      Haryana, India - 121001
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-[#2c1910] p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="text-[#d6c088] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#2c1910] font-serif text-base sm:text-lg mb-1">Call Us</h3>
                    <p className="text-[#654f44] text-xs sm:text-sm">
                      +91 98765 43210<br />
                      +91 98765 43211
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-[#2c1910] p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="text-[#d6c088] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#2c1910] font-serif text-base sm:text-lg mb-1">Email Us</h3>
                    <p className="text-[#654f44] text-xs sm:text-sm">
                      info@thewoodenstories.com<br />
                      support@thewoodenstories.com
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-[#2c1910] p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Clock className="text-[#d6c088] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-[#2c1910] font-serif text-base sm:text-lg mb-1">Business Hours</h3>
                    <p className="text-[#654f44] text-xs sm:text-sm">
                      Monday - Saturday: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-[#2c1910] p-5 sm:p-6 rounded-lg">
                <h3 className="text-[#f3e9c6] font-serif text-lg sm:text-xl mb-3 sm:mb-4">Follow Us</h3>
                <p className="text-[#d6c088] text-sm sm:text-base mb-3 sm:mb-4">Stay connected for latest updates and exclusive offers</p>
                <div className="flex space-x-3 sm:space-x-4">
                  <a href="#" className="bg-[#654f44] p-2.5 sm:p-3 rounded-lg hover:bg-[#d6c088] transition-colors duration-300">
                    <Instagram className="text-[#f3e9c6] w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a href="#" className="bg-[#654f44] p-2.5 sm:p-3 rounded-lg hover:bg-[#d6c088] transition-colors duration-300">
                    <Facebook className="text-[#f3e9c6] w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a href="#" className="bg-[#654f44] p-2.5 sm:p-3 rounded-lg hover:bg-[#d6c088] transition-colors duration-300">
                    <Twitter className="text-[#f3e9c6] w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-20 bg-[#654f44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f3e9c6] mb-3 sm:mb-4">Find Our Store</h2>
            <p className="text-[#d6c088] text-sm sm:text-base">Visit our showroom to experience our collection firsthand</p>
          </div>
          <div className="bg-[#2c1910] h-64 sm:h-80 md:h-96 rounded-lg shadow-lg flex items-center justify-center">
            <p className="text-[#d6c088] text-sm sm:text-base md:text-lg">Map Integration Area</p>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}