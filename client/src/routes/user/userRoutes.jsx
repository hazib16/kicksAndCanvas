import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Home from '../../pages/User/Home';
import Profile from '../../pages/User/Profile';
import Orders from '../../pages/User/Orders';
import OrderDetail from '../../pages/User/OrderDetail';
import Cart from '../../pages/User/Cart';
import Checkout from '../../pages/User/Checkout';
import Wishlist from '../../pages/User/Wishlist';
import AddressBook from '../../pages/User/AddressBook'; // Optional but recommended

export const userRoutes = [
  // ========== PUBLIC ROUTE ==========
  // Home should NOT be protected - anyone can view
  <Route 
    key="home"
    path="/" 
    element={<Home />} 
  />,
  
  // ========== PROTECTED ROUTES ==========
  // Profile & Account Settings
  <Route 
    key="profile"
    path="/profile" 
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } 
  />,
  
  // Wishlist
  <Route 
    key="wishlist"
    path="/wishlist" 
    element={
      <ProtectedRoute>
        <Wishlist />
      </ProtectedRoute>
    } 
  />,
  
  // Cart - Keep protected (checkout requires login)
  <Route 
    key="cart"
    path="/cart" 
    element={
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    } 
  />,
  
  // Checkout
  <Route 
    key="checkout"
    path="/checkout" 
    element={
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    } 
  />,
  
  // Orders List
  <Route 
    key="orders"
    path="/orders" 
    element={
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    } 
  />,
  
  // Individual Order Detail
  <Route 
    key="order-detail"
    path="/orders/:id" 
    element={
      <ProtectedRoute>
        <OrderDetail />
      </ProtectedRoute>
    } 
  />,
  
  // Address Book (Optional but recommended for e-commerce)
  <Route 
    key="addresses"
    path="/addresses" 
    element={
      <ProtectedRoute>
        <AddressBook />
      </ProtectedRoute>
    } 
  />,
];

export default userRoutes;
