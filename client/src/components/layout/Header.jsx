import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

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
            <div className="flex items-center">
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
              <div className="relative group">
                <a href="/collection" className="text-gray-700 hover:text-black">
                  Collection
                </a>
              </div>
              <a href="/about" className="text-gray-700 hover:text-black">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-black">
                Contact
              </a>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
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

              {/* Cart Icon - WITH NAVIGATION */}
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

              {/* User Profile Icon with Dropdown */}
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

                {/* Dropdown Menu */}
                <div className="hidden group-hover:block absolute right-0 pt-4 z-10 top-full">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                    <p 
                      onClick={() => navigate('/profile')}
                      className="cursor-pointer hover:text-black"
                    >
                      My Profile
                    </p>
                    <p 
                      onClick={() => navigate('/orders')}
                      className="cursor-pointer hover:text-black"
                    >
                      Orders
                    </p>
                    <p 
                      onClick={() => navigate('/logout')}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
