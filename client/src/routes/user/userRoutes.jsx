import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Home from '../../pages/User/Home';
import Profile from '../../pages/User/Profile';
import Orders from '../../pages/User/Orders';
import OrderDetail from '../../pages/User/OrderDetail';
import Cart from '../../pages/User/Cart';
import Checkout from '../../pages/User/Checkout';
import Wishlist from '../../pages/User/Wishlist';

export const userRoutes = [
  <Route 
    key="home"
    path="/" 
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="profile"
    path="/profile" 
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="cart"
    path="/cart" 
    element={
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="checkout"
    path="/checkout" 
    element={
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="orders"
    path="/orders" 
    element={
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="order-detail"
    path="/orders/:id" 
    element={
      <ProtectedRoute>
        <OrderDetail />
      </ProtectedRoute>
    } 
  />,
  
  <Route 
    key="wishlist"
    path="/wishlist" 
    element={
      <ProtectedRoute>
        <Wishlist />
      </ProtectedRoute>
    } 
  />,
];

export default userRoutes;
