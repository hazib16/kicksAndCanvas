import { Route } from 'react-router-dom';
import Collection from '../../pages/Product/Collection';
import ProductDetail from '../../pages/Product/ProductDetail';
import SearchResults from '../../pages/Product/SearchResults';

export const productRoutes = [
  <Route 
    key="collection"
    path="/collection" 
    element={<Collection />} 
  />,
  
  <Route 
    key="product-detail"
    path="/product/:id" 
    element={<ProductDetail />} 
  />,
  
  <Route 
    key="search"
    path="/search" 
    element={<SearchResults />} 
  />,
];

export default productRoutes;
