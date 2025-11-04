import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Check authentication status on mount and route changes
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location.pathname]); // Re-check when route changes

  // Check if current page is login/signup
  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  const handleLogout = async () => {
    try {
      // Clear user data
      localStorage.removeItem('user');
      setUser(null);
      
      // Redirect to login
      navigate('/login');
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Get 25% OFF on your first order.{' '}
        <span className="underline cursor-pointer">Order Now</span>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <img 
                src="/src/assets/kicksandcanvas_final.png" 
                alt="KICKS AND CANVAS" 
                className="h-10 w-15"
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-black">
                Home
              </a>
              <a href="/collection" className="text-gray-700 hover:text-black">
                Collection
              </a>
              <a href="/about" className="text-gray-700 hover:text-black">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-black">
                Contact
              </a>
            </div>

            {/* Icons - Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Show on all pages except auth pages */}
              {!isAuthPage && (
                <button className="text-gray-700 hover:text-black">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              )}

              {/* Cart Icon - Show only when logged in and not on auth pages */}
              {user && !isAuthPage && (
                <button 
                  onClick={() => navigate('/cart')}
                  className="text-gray-700 hover:text-black"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>
              )}

              {/* User Profile Dropdown - Show only when logged in and not on auth pages */}
              {user && !isAuthPage && (
                <div className="relative group flex items-center">
                  <button className="text-gray-700 hover:text-black">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu - Only shows when logged in */}
                  <div className="hidden group-hover:block absolute right-0 pt-4 z-10 top-full">
                    <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                      {/* User greeting */}
                      <p className="text-xs font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-1">
                        Hi, {user.name}
                      </p>
                      
                      {/* Profile link */}
                      <p 
                        onClick={() => navigate('/profile')}
                        className="cursor-pointer hover:text-black transition"
                      >
                        My Profile
                      </p>
                      
                      {/* Orders link */}
                      <p 
                        onClick={() => navigate('/orders')}
                        className="cursor-pointer hover:text-black transition"
                      >
                        My Orders
                      </p>
                      
                      {/* Logout - Only shows when logged in */}
                      <p 
                        onClick={handleLogout}
                        className="cursor-pointer hover:text-black transition border-t border-gray-300 pt-2 mt-1 text-red-600 font-medium"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Login/Signup Buttons - Show only when NOT logged in */}
              {!user && !isAuthPage && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800 transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* On Auth Pages - Show opposite action */}
              {!user && isAuthPage && (
                <button
                  onClick={() => navigate(location.pathname === '/login' ? '/signup' : '/login')}
                  className="px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  {location.pathname === '/login' ? 'Sign Up' : 'Login'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
