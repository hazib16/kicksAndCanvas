import React from 'react';
import ProductCard from '../ui/ProductCard';

const ProductSection = ({ 
  label = "SHOP NOW", 
  title, 
  products, 
  showViewAll = false 
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-wider text-gray-500 mb-2">{label}</p>
        <h2 className="text-4xl font-bold">{title}</h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Optional View All Button */}
      {showViewAll && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 font-medium">
            View All Products
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
