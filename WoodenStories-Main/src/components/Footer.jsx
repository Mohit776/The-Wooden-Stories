import React from 'react'

import { ChevronRight, Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <div>
        
         <footer id="contact" className="bg-[#2c1910] py-10 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-wood-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#f3e9c6] mb-3 sm:mb-4 hover:text-[#d6c088] transition-colors duration-300 cursor-pointer">
                The Wooden Stories
              </h3>
              <p className="text-[#d6c088] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Crafting timeless wooden artifacts for modern living spaces since 2018.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <Instagram className="text-[#d6c088] hover:text-[#f3e9c6] cursor-pointer transition-colors duration-300 transform hover:scale-110 w-5 h-5 sm:w-5 sm:h-5" size={20} />
                <Facebook className="text-[#d6c088] hover:text-[#f3e9c6] cursor-pointer transition-colors duration-300 transform hover:scale-110 w-5 h-5 sm:w-5 sm:h-5" size={20} />
                <Mail className="text-[#d6c088] hover:text-[#f3e9c6] cursor-pointer transition-colors duration-300 transform hover:scale-110 w-5 h-5 sm:w-5 sm:h-5" size={20} />
              </div>
            </div>

            <div>
              <h4 className="text-[#f3e9c6] font-medium mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3 text-[#d6c088]">
                {['Shop', 'About Us', 'Gallery', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#f3e9c6] transition-colors duration-300 flex items-center group text-sm sm:text-base">
                      <ChevronRight size={14} className="sm:w-4 sm:h-4 mr-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f3e9c6] font-medium mb-3 sm:mb-4 text-base sm:text-lg">Support</h4>
              <ul className="space-y-2 sm:space-y-3 text-[#d6c088]">
                {['FAQs', 'Shipping', 'Returns', 'Care Guide'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#f3e9c6] transition-colors duration-300 flex items-center group text-sm sm:text-base">
                      <ChevronRight size={14} className="sm:w-4 sm:h-4 mr-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f3e9c6] font-medium mb-3 sm:mb-4 text-base sm:text-lg">Visit Us</h4>
              <div className="text-[#d6c088] text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                <p>123 Artisan Street</p>
                <p>Woodcraft District</p>
                <p>Mumbai, 400001</p>
                <p className="mt-3 sm:mt-4">+91 98765 43210</p>
                <p>hello@woodenstories.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#654f44] pt-6 sm:pt-8 text-center">
            <p className="text-[#d6c088] text-xs sm:text-sm px-4">
              &copy; 2024 The Wooden Stories. All rights reserved. | Crafted with passion in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
