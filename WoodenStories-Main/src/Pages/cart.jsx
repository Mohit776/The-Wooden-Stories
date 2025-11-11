import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ChevronRight, Tag, Truck, Shield, X } from 'lucide-react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Walnut Wall Panel',
      category: 'Wall Art',
      price: 8999,
      quantity: 1,
      inStock: true
    },
    {
      id: 2,
      name: 'Teak Coffee Table',
      category: 'Furniture',
      price: 24999,
      quantity: 1,
      inStock: true
    },
    {
      id: 3,
      name: 'Carved Wall Accent',
      category: 'Decor',
      price: 6499,
      quantity: 2,
      inStock: true
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WOOD10') {
      setAppliedCoupon({ code: 'WOOD10', discount: 10 });
    } else if (couponCode.toUpperCase() === 'SAVE500') {
      setAppliedCoupon({ code: 'SAVE500', discount: 500, isFixed: true });
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.isFixed 
      ? appliedCoupon.discount 
      : Math.round(subtotal * (appliedCoupon.discount / 100));
  }
  
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-[#f3e9c6] min-h-screen pt-6">
      {/* Navigation */}
   

      {/* Hero Section */}
      <section className="bg-[#2c1910] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-1 w-12 sm:w-16 bg-[#d6c088] mb-4 sm:mb-6"></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#f3e9c6] mb-2">Shopping Cart</h1>
          <p className="text-[#d6c088] text-sm sm:text-base">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
              <ShoppingBag className="mx-auto mb-4 text-[#654f44] w-16 h-16 sm:w-20 sm:h-20" size={64} />
              <h2 className="text-xl sm:text-2xl font-serif text-[#2c1910] mb-3 sm:mb-4">Your cart is empty</h2>
              <p className="text-[#654f44] text-sm sm:text-base mb-4 sm:mb-6">Add some beautiful wooden artifacts to get started!</p>
              <button className="bg-[#2c1910] text-[#f3e9c6] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-[#654f44] transition-colors duration-300 text-sm sm:text-base">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-28 md:w-32 h-28 sm:h-32 bg-[#654f44] rounded-lg flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-[#f3e9c6] to-[#d6c088] opacity-20 rounded-lg"></div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-2">
                            <p className="text-[#654f44] text-xs sm:text-sm uppercase tracking-wide">{item.category}</p>
                            <h3 className="text-[#2c1910] font-serif text-base sm:text-lg md:text-xl mb-1">{item.name}</h3>
                            {item.inStock ? (
                              <p className="text-green-600 text-xs sm:text-sm">In Stock</p>
                            ) : (
                              <p className="text-red-500 text-xs sm:text-sm">Out of Stock</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#654f44] hover:text-red-500 transition-colors duration-300 flex-shrink-0"
                          >
                            <Trash2 size={18} className="sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 gap-3 sm:gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-[#654f44] text-xs sm:text-sm">Quantity:</span>
                            <div className="flex items-center border-2 border-[#d6c088] rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 sm:p-2 hover:bg-[#f3e9c6] transition-colors duration-300"
                              >
                                <Minus size={14} className="sm:w-4 sm:h-4 text-[#654f44]" />
                              </button>
                              <span className="px-3 sm:px-4 text-[#2c1910] font-medium text-sm sm:text-base">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 sm:p-2 hover:bg-[#f3e9c6] transition-colors duration-300"
                              >
                                <Plus size={14} className="sm:w-4 sm:h-4 text-[#654f44]" />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-left sm:text-right">
                            <p className="text-[#2c1910] font-serif text-lg sm:text-xl md:text-2xl font-semibold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-[#654f44] text-xs sm:text-sm">₹{item.price.toLocaleString()} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping Button */}
                <button className="text-[#2c1910] font-medium flex items-center space-x-2 hover:text-[#654f44] transition-colors duration-300 mt-6">
                  <span>← Continue Shopping</span>
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-6">
                  <h2 className="text-xl sm:text-2xl font-serif text-[#2c1910] mb-4 sm:mb-6">Order Summary</h2>

                  {/* Coupon Code */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-[#654f44] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Coupon Code</label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-[#f3e9c6] px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Tag size={14} className="sm:w-4 sm:h-4 text-[#654f44]" />
                          <span className="text-[#2c1910] font-medium text-sm sm:text-base">{appliedCoupon.code}</span>
                        </div>
                        <button onClick={removeCoupon} className="text-[#654f44] hover:text-red-500 transition-colors duration-300">
                          <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-3 sm:px-4 py-2 border-2 border-[#d6c088] focus:border-[#654f44] focus:outline-none rounded-lg text-sm sm:text-base"
                        />
                        <button
                          onClick={applyCoupon}
                          className="bg-[#2c1910] text-[#f3e9c6] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#654f44] transition-colors duration-300 text-sm sm:text-base"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-[#d6c088]">
                    <div className="flex justify-between text-[#654f44] text-sm sm:text-base">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600 text-sm sm:text-base">
                        <span className="text-xs sm:text-sm">Discount ({appliedCoupon.isFixed ? '₹' + appliedCoupon.discount : appliedCoupon.discount + '%'})</span>
                        <span>-₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#654f44] text-sm sm:text-base">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : '₹' + shipping}</span>
                    </div>
                    {subtotal < 50000 && (
                      <p className="text-[10px] sm:text-xs text-[#654f44]">Add ₹{(50000 - subtotal).toLocaleString()} more for free shipping</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <span className="text-[#2c1910] font-serif text-lg sm:text-xl">Total</span>
                    <span className="text-[#2c1910] font-serif text-2xl sm:text-3xl font-semibold">₹{total.toLocaleString()}</span>
                  </div>

                  <button className="w-full bg-[#2c1910] text-[#f3e9c6] py-3 sm:py-4 rounded-lg hover:bg-[#654f44] transition-all duration-300 flex items-center justify-center space-x-2 group mb-3 sm:mb-4 text-sm sm:text-base">
                    <span>Proceed to Checkout</span>
                    <ChevronRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  {/* Benefits */}
                  <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-[#d6c088]">
                    <div className="flex items-center space-x-2 sm:space-x-3 text-[#654f44] text-xs sm:text-sm">
                      <Truck size={16} className="sm:w-[18px] sm:h-[18px] text-[#2c1910]" />
                      <span>Free shipping on orders over ₹50,000</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 text-[#654f44] text-xs sm:text-sm">
                      <Shield size={16} className="sm:w-[18px] sm:h-[18px] text-[#2c1910]" />
                      <span>Secure checkout with encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
   
    </div>
  );
}