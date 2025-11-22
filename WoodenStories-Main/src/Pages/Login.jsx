import React, { useState } from 'react';
import { Phone, User, Mail, ArrowRight, Loader, AlertCircle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({
    phone: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginData.phone || loginData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if customer exists
      const response = await axios.get(`${API_URL}/profile/${loginData.phone}`);
      
      if (response.data) {
        // Store phone in localStorage and cookie
        localStorage.setItem('userPhone', loginData.phone);
        document.cookie = `userPhone=${loginData.phone}; path=/; max-age=31536000`;
        
        // Redirect to profile or home page
        alert('Login successful!');
        navigate('/profile');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 404) {
        setError('Account not found. Please sign up first.');
      } else {
        setError('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!signupData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!signupData.email.trim() || !signupData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (!signupData.phone || signupData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create new customer
      const response = await axios.post(`${API_URL}/customers`, {
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone
      });

      if (response.data) {
        // Store phone in localStorage and cookie
        localStorage.setItem('userPhone', signupData.phone);
        document.cookie = `userPhone=${signupData.phone}; path=/; max-age=31536000`;
        
        alert('Account created successfully!');
        navigate('/profile');
      }
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response && err.response.status === 400) {
        setError('Phone number already registered. Please login.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3e9c6] flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed top-20 left-20 w-64 h-64 bg-[#d6c088] opacity-20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-[#654f44] opacity-20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-[#2c1910] p-3 rounded-lg">
                <ShoppingBag className="text-[#d6c088]" size={32} />
              </div>
              <h1 className="text-4xl font-serif text-[#2c1910]">The Wooden Stories</h1>
            </div>
            <h2 className="text-5xl font-serif text-[#2c1910] mb-4 leading-tight">
              Welcome Back to Your
              <span className="block text-[#654f44]">Shopping Experience</span>
            </h2>
            <p className="text-[#654f44] text-lg leading-relaxed">
              Access your orders, manage your profile, and discover handcrafted wooden artifacts that bring warmth and elegance to your home.
            </p>
          </div>

          {/* Decorative Element */}
          <div className="relative">
            <div className="bg-[#2c1910] h-64 w-full rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full bg-linear-to-br from-[#f3e9c6] to-[#d6c088] opacity-20"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#654f44] h-64 w-full rounded-lg -z-10"></div>
          </div>

          <div className="flex items-center space-x-8">
            <div>
              <h3 className="text-3xl font-serif text-[#2c1910] mb-1">500+</h3>
              <p className="text-[#654f44] text-sm">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-[#2c1910] mb-1">150+</h3>
              <p className="text-[#654f44] text-sm">Unique Products</p>
            </div>
            <div>
              <h3 className="text-3xl font-serif text-[#2c1910] mb-1">100%</h3>
              <p className="text-[#654f44] text-sm">Handcrafted</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Logo for Mobile */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-3xl font-serif text-[#2c1910]">The Wooden Stories</h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-[#f3e9c6] rounded-lg p-1 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                isLogin ? 'bg-[#2c1910] text-[#f3e9c6] shadow-lg' : 'text-[#654f44]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                !isLogin ? 'bg-[#2c1910] text-[#f3e9c6] shadow-lg' : 'text-[#654f44]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-start space-x-2">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-[#2c1910] mb-2">Welcome Back!</h3>
                <p className="text-[#654f44]">Enter your phone number to continue</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[#654f44] font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={loginData.phone}
                      onChange={handleLoginChange}
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <p className="text-xs text-[#654f44] mt-1">Enter the phone number registered with your account</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2c1910] text-[#f3e9c6] py-4 rounded-lg hover:bg-[#654f44] transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[#654f44] text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#2c1910] font-medium hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          ) : (
            /* Sign Up Form */
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-[#2c1910] mb-2">Create Account</h3>
                <p className="text-[#654f44]">Sign up to start shopping</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-[#654f44] font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={signupData.name}
                      onChange={handleSignupChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#654f44] font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#654f44] font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      placeholder="Enter 10-digit phone number"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2c1910] text-[#f3e9c6] py-4 rounded-lg hover:bg-[#654f44] transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-[#654f44] text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[#2c1910] font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}