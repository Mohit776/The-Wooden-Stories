import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', formData);

        if (formData.username == "admin" && formData.password == "123") {

            navigate("/Admin");
            alert('Login Successful! Welcome to The Wooden Stories');

        } else {

            alert('Invalid credentials. Please try again.');
        }


    };

    return (
        <div className="min-h-screen bg-[#f3e9c6] flex items-center justify-center p-4">
            {/* Background Decorations */}
            <div className="fixed top-20 left-20 w-64 h-64 bg-[#d6c088] opacity-20 rounded-full blur-3xl"></div>
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-[#654f44] opacity-20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-xl relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-serif text-[#2c1910]">The Wooden Stories</h2>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-serif text-[#2c1910] mb-2">Welcome Back!</h3>
                            <p className="text-[#654f44]">Enter your credentials to continue</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Username */}
                            <div>
                                <label className="block text-[#654f44] font-medium mb-2">Username</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-[#654f44] font-medium mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#654f44]" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-12 py-3 border-2 border-[#d6c088] rounded-lg focus:border-[#654f44] focus:outline-none transition-colors duration-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#654f44] hover:text-[#2c1910] transition-colors duration-300"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#2c1910] text-[#f3e9c6] py-4 rounded-lg hover:bg-[#654f44] transition-all duration-300 flex items-center justify-center space-x-2 group font-medium"
                            >
                                <span>Login</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
