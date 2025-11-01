import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false,
  className = '' 
}) => {
  const baseStyles = 'px-6 py-2 rounded-md transition font-medium';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'border border-gray-300 hover:bg-gray-50',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
