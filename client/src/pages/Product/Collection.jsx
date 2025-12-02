import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Collection = () => {
  const { category, brand } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('All Products');

  useEffect(() => {
    // Determine the page title based on route
    if (category) {
      setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} Collection`);
    } else if (brand) {
      setTitle(`${brand} Products`);
    } else if (location.pathname.includes('/new')) {
      setTitle('New Arrivals');
    } else if (location.pathname.includes('/sale')) {
      setTitle('Sale Items');
    } else {
      setTitle('All Products');
    }

    // Fetch products based on filters
    fetchProducts();
  }, [category, brand, location.pathname]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build API endpoint based on filters
      let endpoint = '/api/products';
      
      if (category) {
        endpoint += `?category=${category}`;
      } else if (brand) {
        endpoint += `?brand=${brand}`;
      } else if (location.pathname.includes('/new')) {
        endpoint += '?sort=newest';
      } else if (location.pathname.includes('/sale')) {
        endpoint += '?sale=true';
      }

      // const response = await fetch(endpoint);
      // const data = await response.json();
      // setProducts(data.products);
      
      // Temporary mock data
      setProducts([]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      
      {/* Filters */}
      <div className="mb-8">
        {/* Add your filters here */}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              {/* Product card */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
