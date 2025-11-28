import React from 'react';

const Input = React.forwardRef(
  ({ label, error, type = 'text', id, placeholder, className = '', ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
