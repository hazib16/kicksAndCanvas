import { Route } from 'react-router-dom';
import Collection from '../../pages/Product/Collection';
import ProductDetail from '../../pages/Product/ProductDetail'
import SearchResults from '../../pages/Product/SearchResults'

export const productRoutes = [
  // Product collection/listing page
  <Route 
    key="collection"
    path="/products" 
    element={<Collection />} 
  />,
  
  // Category-based collection (optional)
  <Route 
    key="category"
    path="/products/category/:category" 
    element={<Collection />} 
  />,
  
  // Product detail page
  <Route 
    key="product-detail"
    path="/products/:id" 
    element={<ProductDetail />} 
  />,
  
  // Search results
  <Route 
    key="search"
    path="/search" 
    element={<SearchResults />} 
  />,
];

export default productRoutes;
