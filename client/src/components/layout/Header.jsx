import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUserThunk, selectUser, selectIsAuthenticated } from '../../store/slices/authSlice';
import ConfirmationModal from '../ui/ConfirmationModal'; // ← Add import

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // ← Add state
  const dropdownRef = useRef(null);
  
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  // Updated logout handler - shows confirmation modal
  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutModal(true); // ← Show modal instead of alert
  };

  // Actual logout after confirmation
  const handleLogoutConfirm = () => {
    dispatch(logoutUserThunk());
    navigate('/login', { replace: true });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Get 25% OFF on your first order.{' '}
        <span className="underline cursor-pointer">Order Now</span>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
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
              <a href="/" className="text-gray-700 hover:text-black font-medium transition-colors">
                Home
              </a>
              <a href="/collection" className="text-gray-700 hover:text-black font-medium transition-colors">
                Collection
              </a>
              <a href="/about" className="text-gray-700 hover:text-black font-medium transition-colors">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-black font-medium transition-colors">
                Contact
              </a>
            </div>

            {/* Icons - Right Side */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              {!isAuthPage && (
                <button className="text-gray-700 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-lg">
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

              {/* Cart Icon */}
              {isAuthenticated && !isAuthPage && (
                <button 
                  onClick={() => navigate('/cart')}
                  className="text-gray-700 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-lg"
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

              {/* User Profile Dropdown */}
              {isAuthenticated && !isAuthPage && (
                <div className="relative" ref={dropdownRef}>
                  {/* Profile Button */}
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-gray-700 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-lg"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                      {/* User Info */}
                      <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          Hi, {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* My Profile */}
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
                        >
                          My Profile
                        </button>

                        {/* Orders */}
                        <button
                          onClick={() => {
                            navigate('/orders');
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium text-sm"
                        >
                          My Orders
                        </button>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-2"></div>

                        {/* Logout - Updated to show modal */}
                        <button
                          onClick={handleLogoutClick}
                          className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold text-sm"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* On Auth Pages - Login/Signup Toggle */}
              {!isAuthenticated && isAuthPage && (
                <button
                  onClick={() => navigate(location.pathname === '/login' ? '/signup' : '/login')}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
                >
                  {location.pathname === '/login' ? 'Sign Up' : 'Login'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout? You'll need to login again to access your account."
        confirmText="Logout"
        cancelText="Stay Logged In"
        type="danger"
      />
    </>
  );
};

export default Header;
