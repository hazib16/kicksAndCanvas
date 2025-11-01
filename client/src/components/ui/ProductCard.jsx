import React from 'react';

const ProductCard = ({ product }) => {
  const { id, name, image, price, originalPrice, inStock } = product;

  return (
    <div className="group cursor-pointer">
      {/* Product Image */}
      <div className="overflow-hidden bg-gray-50 rounded mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-sm font-medium mb-2">{name}</h3>

      {/* Stock Status and Price */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
        </span>
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-base font-bold">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
