import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ProductSection from '../../components/sections/ProductSection';
import axiosInstance from '../../api/axiosInstance.js'

const Home = () => {
  const user = useSelector(selectUser);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const bestSellersRes = await axiosInstance.get('/products/best-sellers?limit=4');
        setBestSellers(bestSellersRes.data.products || []);

        const newArrivalsRes = await axiosInstance.get('/products/new-arrivals?limit=4');
        setNewArrivals(newArrivalsRes.data.products || []);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-black leading-tight text-black tracking-tight">
                  Fresh Arrivals <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Online</span>
                </h1>
                <div className="w-16 h-1 bg-black rounded-full"></div>
              </div>
              
              <p className="text-xl text-gray-600 max-w-md leading-relaxed">
                Discover Your Favorites Among Our Latest Arrivals. Step into excellence with curated collections.
              </p>

              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={() => window.location.href = '/collection'}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-gray-900 transition-all duration-300 font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  View Collection
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2.5} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </button>
              </div>
            </div>

            
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent z-10 rounded-2xl"></div>
                <img
                  src="/src/assets/banner3.jpg"
                  alt="Outta Here - Nike Campaign"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-gray-100 rounded-full opacity-30 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Free Delivery */}
            <div className="group text-center space-y-5 p-8 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center">
                <div className="p-4 bg-black rounded-full group-hover:bg-gray-900 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-black">Free Delivery</h3>
                <p className="text-gray-600 text-sm mt-2">For all orders over $99</p>
              </div>
            </div>

            {/* Secure Payments */}
            <div className="group text-center space-y-5 p-8 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center">
                <div className="p-4 bg-black rounded-full group-hover:bg-gray-900 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-black">Secure Payments</h3>
                <p className="text-gray-600 text-sm mt-2">All major payment methods accepted</p>
              </div>
            </div>

            {/* Customer Support */}
            <div className="group text-center space-y-5 p-8 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center">
                <div className="p-4 bg-black rounded-full group-hover:bg-gray-900 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-black">24/7 Support</h3>
                <p className="text-gray-600 text-sm mt-2">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        </div>
      ) : (
        <ProductSection
          label="SHOP NOW"
          title="Best Selling"
          products={bestSellers}
          showViewAll={false}
        />
      )}

      {/* Featured Banner */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500 rounded-full mix-blend-overlay blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">New Collection</p>
                <h2 className="text-6xl lg:text-7xl font-black leading-tight">
                  THE FUTURE JUST LANDED
                </h2>
                <div className="w-16 h-1 bg-white rounded-full"></div>
              </div>
              
              <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                Own the new season with our latest collections. Experience innovation and style like never before.
              </p>

              <button 
                onClick={() => window.location.href = '/collection'}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </button>
            </div>

            {/* Right Image - New Balance */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm lg:max-w-md h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-2xl"></div>
                <img
                  src="/src/assets/banner2.jpg"
                  alt="New Balance Collection"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {!loading && (
        <ProductSection
          label="NEW COLLECTION"
          title="New Arrivals"
          products={newArrivals}
          showViewAll={true}
        />
      )}

      {/* Newsletter Section */}
      <section className="relative bg-white py-24">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-black via-transparent to-black"></div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-5xl lg:text-6xl font-black text-black">Stay in the Loop</h2>
              <p className="text-xl text-gray-600">
                Subscribe to get special offers, new arrivals, and exclusive updates delivered to your inbox.
              </p>
            </div>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors text-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
